// initial imports
import ws from 'ws';
import fetch from 'node-fetch';
import {EventEmitter as Emitter} from 'events';
import {red, yellow, bold} from 'chalk';
import os from 'os';
import pako from 'pako';
// @ts-ignore
import zlib from 'fast-zlib';
import {config} from 'dotenv';
import handlers from './handlers/handlers.index';
import {statusTypesArray, authHeader} from './utils';
import {Cache} from './caches/base';
// import { connect } from "./client_functions";

config();

export interface MessageProperties {
	content?: string;
}

export interface EmbedProperties {
	embed: {
		title?: string;
		author?: object;
		thumbnail?: string;
		description?: string;
		fields?: object[];
		colour?: string | number;
		color?: EmbedProperties['embed']['colour'];
		footer?: object;
		image?: string;
	}
};

export interface ClientOptions {
	browser?: string;
	device?: string;
	prefix?: string;
	cacheChannels?: boolean,
    cacheGuilds?: boolean,
    cacheUsers?: boolean,
    cacheMembers?: boolean,
	activity?: {name: string, type: number};
	status?: 'dnd' | 'invisible' | 'online' | 'idle';
}

export interface StatusInfo {

}

/**
 * @param {string} token the token used to login to the gateway
 * @param {any} socket
 * @param {any} config
 */
export class Client extends Emitter {
	token: string;
	socket: any;
	activities: any;
	hb: any;
	config: ClientOptions;
	cache: any;
	/**
	 *
	 * @param {string} token the token used to login to the gateway
	 * @param {ClientOptions} options ClientOptions
	 */
	constructor(token: string, options?: ClientOptions) {
	  super();
	  if (!token) throw new Error(`${red.bold('[ERROR/websocket]')} ${red('No token was provided')}`);
	  this.token = token;
	  if (!options) {
	    this.config = {
	    browser: 'ourcord (https://github.com/ourcord/ourcord)',
	    device: 'ourcord (https://github.com/ourcord/ourcord)',
	    status: 'dnd',
	  };
	  } else this.config = options;
	  this.cache = new Cache(this, this.config);
	}

	connect() {
	  this.emit('debug', `${yellow.bold('[NOTICE/websocket]')} ${yellow('Attempting to connect to the discord gateway')}`);
	  // eslint-disable-next-line new-cap
	  this.socket = new ws('wss://gateway.discord.gg/?v=6&encoding=json');
	  this.socket.once('open', () => {
	    this.emit('debug', `${yellow.bold('[NOTICE/websocket]')} ${yellow('Attempting to login')}`);
	    const data = JSON.stringify(this.getMetaData());
	    this.socket.send(data);
	    this.socket.once('error', (error: string) => {
	      handlers.errorHandler(error, this);
	    });
	    this.socket.on('message', (message: any, flag: any) => {
	      handlers.messageHandler(message, flag, this);
	    });
	    this.socket.on('close', (h: any) => {
		  clearInterval(this.hb);
		  this.emit('debug', `${bold('[NOTICE/websocket]')} Connection closed unexpectedly (code ${h}). Re-attempting login`);
	      this.connect();
	    });
	  });
	};

	/**
 *
 * @param {string} reason the reason the socket was closed
 */
	destroy(reason?: string) {
	  this.socket.close();
	  this.emit('debug', `${red.bold('[NOTICE/websocket]')} ${red(reason ? reason : 'The websocket was closed')}`);
	};
	/**
 *
 * @param {string} channel the channel ID which the message will be sent in
 * @param {any} content the body of the message
 */
	async _sendMessage(channel: string, content: string | object) {
	  const url = `https://discord.com/api/v7/channels/${channel}/messages`;
	  let b: MessageProperties = {};
	  if (!content || !content.toString().length) throw new Error('[ERROR/discordAPI error] Cannot send a message with no content');
	  if (typeof content === 'string') b.content = content;
	  if (typeof content === 'object') b = content;
	  const sent = await fetch(url, {
	    method: 'POST',
	    headers: {
	      'Authorization': authHeader(this.token),
	      'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(b),
	  });
	  return await sent.json();
	};
	/**
 *
 * @param {string} channel the channel ID which the message will be sent in
 * @param {any} options the properties of the embed
 */
	async _MessageEmbed(channel: string, options: EmbedProperties) {
	  const url = `https://discord.com/api/v7/channels/${channel}/messages`;
	  if (!options) throw new Error('[ERROR/discordAPI error] Cannot send a message with no content');
	  const data = await fetch(url, {
	    method: 'POST',
	    headers: {
	      'Authorization': authHeader(this.token),
	      'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(options),
	  });
	  return await data.json();
	};
	/**
	 *
	 * @param {string} userID the userID to get from Discord's rest API
	 */
	async _GetRestUser(userID: string) {
	  const url = `https://discord.com/api/v7/users/${userID}`;
	  if (!userID || !userID.toString().length) throw new Error('[ERROR/discordAPI error] Please provide a userID');
	  const data = await fetch(url, {
	    method: 'GET',
	    headers: {
	      'Authorization': authHeader(this.token),
	      'Content-Type': 'application/json',
	    },
	  });
	  return await data.json();
	};

	getMetaData(): object {
	  const metaData = {
	    op: 2,			// opcode of 2 means "identify"
	    d: {			// d is for data
	      token: this.token,
	      properties: {
	        $os: os.platform,
	        $browser: this.config.browser,
	        $device: this.config.device,
	      },
	      presence: {
	        // activities: [{name: this.config.activity.name ? this.config.activity.name : null, type: 0}],
	        status: this.config.status,
	      },
	    },
	  };
	  return metaData;
	};
	/**
 *
 * @param {any} data
 * @param {any} flag
 * @return {string}
 */
	evaluate(data: any, flag: any) {
	  if (typeof flag !== 'object') flag = {};
	  if (!flag.binary) return JSON.parse(data);
	  const inflateData = new pako.Inflate();
	  inflateData.push(data);
	  if (inflateData.err) throw new Error('[ERROR/pako error] An error occured while decompressing data');
	  return JSON.parse(inflateData.toString());
	};

	// eslint-disable-next-line require-jsdoc
	setStatus(t: 'dnd' | 'invisible' | 'online' | 'idle') {
	  if (!statusTypesArray.includes(t)) {
	    throw new Error('[ERROR/discordAPI error] Status provided is incorrect');
	  }
	  try {
	    const p = JSON.stringify({
	      op: 3,
	      d: {
			  status: t,
			  afk: false,
			  since: t == 'idle' ? Date.now() : null,
			  game: null,
	      },
		  });
	    console.log(p);
	    this.socket.send(p);
	  } catch (err) {
	    throw new Error(err);
	  }
	}
	/**
	 *
	 * @param {string} g the guild ID in which the channel should be created in
	 * @param {string} name the name of the channel to be created
	 */
	async createChannel(g: string, name: string) {
	  const url = `https://discord.com/api/v7/guilds/${g}/channels`;
	  const channel = await fetch(url, {
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json',
	      'Authorization': authHeader(this.token),
	    },
	    body: JSON.stringify({
	      name,
	    }),
	  }).then((c) => c.json());
	  return channel;
	}
}

declare module Client {};

export default Client;
