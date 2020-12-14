// initial imports
/// <reference path="websocket.d.ts"/>
import ws from 'ws';
import fetch from 'node-fetch';
import { EventEmitter as Emitter } from 'events';
import { red, yellow, bold } from 'chalk';
import os from 'os';
import pako from 'pako';
// @ts-ignore
import zlib from 'fast-zlib';
import { config } from 'dotenv';
import handlers from './handlers/handlers.index';
import { statusTypesArray, authHeader } from './utils';
import { Cache } from './caches/base';
import { MessageRaw } from './structures/MessageRaw';
import { EmojiRaw } from './structures/EmojiRaw';

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

export interface ModifyEmoji {
	name?: string,
	roles?: Array<string>
};

export interface ClientOptions {
	browser?: string;
	device?: string;
	prefix?: string;
      cacheChannels?: boolean,
      cacheGuilds?: boolean,
      cacheUsers?: boolean,
      cacheMembers?: boolean,
	activity?: { name: string, type: number };
	status?: 'online' | 'idle' | 'dnd' | 'invisible';
}

export interface StatusInfo {}

/**
 * @param {string} token The client's token used for gateway connection.
 * @param {any} socket The socket.
 * @param {any} config The configurations.
 */
export class Client extends Emitter {
	token: string;
	socket: any;
	activities: any;
	hb: any;
	config: ClientOptions;
	cache: any;

	/**
	 * The main client constructor.
	 * @param {string} token The client's token used for gateway connection.
	 * @param {ClientOptions} options Options this client is instantiated with.
	 */
	constructor(token: string, options?: ClientOptions) {
	  super();
	  if (!token) throw new Error(`${red.bold('[ERROR/Websocket]')} ${red('Expected a client token')}`);
          // Using 'Object.defineProperty()' to prevent the token from being enumerable.
	  Object.defineProperty(this, 'token', {
             value: token,
             writable: true,
             enumerable: false
          });
	  this.config = options || {
	    browser: 'ourcord (https://github.com/ourcord/ourcord)',
	    device: 'ourcord (https://github.com/ourcord/ourcord)',
	    status: 'dnd'
	  };
	  this.cache = new Cache(this, this.config);
	}

        /**
         * The method used to connect to the gateway.
         * @returns {undefined}
         */
	connect(): void {
	  this.emit('debug', `${yellow.bold('[NOTICE/Websocket]')} ${yellow('Attempting to connect to the discord gateway')}`);
	  // eslint-disable-next-line new-cap
	  this.socket = new ws('wss://gateway.discord.gg/?v=6&encoding=json');
	  this.socket.once('open', () => {
	    this.emit('debug', `${yellow.bold('[NOTICE/Websocket]')} ${yellow('Attempting to login')}`);
	    const data = JSON.stringify(this.getMetaData());
	    this.socket.send(data);
	    this.socket.once('error', (error: string) => handlers.errorHandler(error, this));
	    this.socket.on('message', (message: any, flag: any) => handlers.messageHandler(message, flag, this));
	    this.socket.on('close', (h: any) => {
	      clearInterval(this.hb);
	      this.emit('debug', `${bold('[NOTICE/Websocket]')} ${red(`Connection closed unexpectedly (code ${h}). Re-attempting login`)}`);
	      this.connect();
	    });
	  });
	};

	/**
         * The method used to destroy the client and close the connection to the websocket.
         * @param {string} [reason] The reason to close the socket.
         * @returns {undefined}
         */
	destroy(reason?: string): void {
	  this.socket.close();
	  this.emit('debug', `${red.bold('[NOTICE/Websocket]')} ${red(reason || 'The websocket was closed')}`);
	};

	/**
         * The method used to send a message to a TextChannel.
         * @param {string} channel ID of the TextChannel the message will be sent in.
         * @param {(string|object)} content The body of the message.
         * @returns {Promise<MessageRaw>}
         */
	async _sendMessage(channel: string, content: string | object): Promise<MessageRaw> {
	  const url = `https://discord.com/api/v7/channels/${channel}/messages`;
	  let b: MessageProperties = {};
	  if (content === null || typeof content === 'undefined' || !content.toString().length) throw new Error(`${red.bold('[ERROR/DiscordAPI Error]')} Cannot send a message with no content`);
	  if (typeof content === 'string') b.content = content;
	  if (typeof content === 'object') b = content;
	  return await fetch(url, {
	    method: 'POST',
	    headers: {
	      'Authorization': authHeader(this.token),
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(b)
	  }).then(res => res.json());
	};

	/**
	 * Method to update an Emoji
	 * @param {string} guild ID of the Guild that the Emoji belongs to
	 * @param {string} emoji ID of the Emoji that is to be modified
	 * @param {string} name New name of the Emoji 
	 * @param {Array<string>} roles Array of all Role ids which should be whitelisted to the emoji
	 */
	async _modifyEmoji(guild: string, emoji: string, name?: string, roles?: Array<string>): Promise<EmojiRaw> {
		const url = `https://discord.com/api/v7/guilds/${guild}/emojis/${emoji}`;
		let b: ModifyEmoji = {};
		if (name) b.name = name;
		if (roles) b.roles = roles;
		const sent = await fetch(url, {
			method: 'PATCH',
			headers: {
				'Authorization': authHeader(this.token),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(b),
		});
		return await sent.json();
	}
	/**
	 * Method to delete an emoji
	 * @param guild ID of the Guild that the Emoji belongs to
	 * @param emoji ID of the Emoji that is to be deleted
	 */
	async _deleteEmoji(guild: string, emoji: string): Promise<boolean> {
		const url = `https://discord.com/api/v7/guilds/${guild}/emojis/${emoji}`;
		const sent = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Authorization': authHeader(this.token),
				'Content-Type': 'application/json',
			},
		});
		return await sent.status === 204;
	}

	/**
         * The method used to send an embed in a TextChannel.
         * @param {string} channel ID of the TextChannel the message will be sent in.
         * @param {EmbedProperties} options The embed data.
         * @returns {Promise<object>}
         */
	async _MessageEmbed(channel: string, options: EmbedProperties): Promise<object> {
	  const url = `https://discord.com/api/v7/channels/${channel}/messages`;
	  if (options === null || typeof options === 'undefined') throw new Error(`${red.bold('[ERROR/DiscordAPI Error]')} Cannot send a message with no content`);
	  return await fetch(url, {
	    method: 'POST',
	    headers: {
	      'Authorization': authHeader(this.token),
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(options)
	  }).then(res => res.json());
	};

	/**
	 * The method used to fetch a user from the rest discord API.
	 * @param {string} userID The ID of the user to fetch.
       * @returns {Promise<object>}
	 */
	async _GetRestUser(userID: string): Promise<object> {
	  const url = `https://discord.com/api/v7/users/${userID}`;
	  if (userID === null || typeof userID === 'undefined' || !userID.toString().length) throw new Error(`${red.bold('[ERROR/DiscordAPI Error]')} ${userID} is not snowflake`);
	  return await fetch(url, {
	    method: 'GET',
	    headers: {
	      'Authorization': authHeader(this.token),
	      'Content-Type': 'application/json'
	    }
	  }).then(res => res.json());
	};

        /**
         * The method used to get the metadata.
         * @returns {object}
         */
	getMetaData(): object {
	  const metaData = {
	    op: 2, // opcode of 2 means "identify"
	    d: { // d is for data
	      token: this.token,
	      properties: {
	        $os: os.platform,
	        $browser: this.config.browser,
	        $device: this.config.device,
	      },
	      presence: {
	        activities: [{
				name: this.config.activity.name || null, 
				type: 0
			}],
	        status: this.config.status,
	      },
	    },
	  };
	  return metaData;
	};

	/**
         * Evaluates under the hood stuff.
         * @param {any} data The data to evaluate.
         * @param {any} flag The flags for evaluation.
         * @return {string}
         */
	evaluate(data: any, flag: any) {
	  if (typeof flag !== 'object') flag = {};
	  if (flag.binary === null || typeof flag.binary === 'undefined') return JSON.parse(data);
	  const inflateData = new pako.Inflate();
	  inflateData.push(data);
	  if (inflateData.err) throw new Error(`${red.bold('[ERROR/Pako Error]')} An error occured while decompressing data`);
	  return JSON.parse(inflateData.toString());
	};

	/**
       * The method used to set the status of the client.
       * @param {('online'|'idle'|'dnd'|'invisible')} t The status type to set client's status to.
       * @returns {undefined}
       */
	setStatus(t: 'online' | 'idle' | 'dnd' | 'invisible'): void {
	  if (!statusTypesArray.includes(t)) throw new Error(`${red.bold('[ERROR/DiscordAPI Error]')} Invalid status type`);
	  try {
	    const p = JSON.stringify({
	      op: 3,
	      d: {
               status: t,
	         afk: false,
	         since: t === 'idle' ? Date.now() : null,
	         game: null,
	      },
            });
	    console.log(p);
	    this.socket.send(p);
	  } catch (err) {
	    throw new Error(err);
	  }
	};

	/**
	 * The method used to create a GuildChannel
	 * @param {string} g ID of the guild where the channel will be created in.
	 * @param {string} name The name of the channel
         * @returns {Promise<object>}
	 */
	async createChannel(g: string, name: string): Promise<object> {
          if (typeof g !== 'string') throw new Error(`${red.bold('[ERROR/DiscordAPI Error]')} ${g} is not snowflake`);
          if (typeof name !== 'string') throw new Error(`${red.bold('[ERROR/DiscordAPI Error]')} The channel name is required`);
	  const url = `https://discord.com/api/v7/guilds/${g}/channels`;
	  return await fetch(url, {
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json',
	      'Authorization': authHeader(this.token),
	    },
	    body: JSON.stringify({
	      name,
	    }),
	  });
	};
}

export default Client;
=======
// initial imports
/// <reference path="websocket.d.ts"/>
import ws from 'ws';
import fetch from 'node-fetch';
import { EventEmitter as Emitter } from 'events';
import { red, yellow, bold } from 'chalk';
import os from 'os';
import pako from 'pako';
// @ts-ignore
import zlib from 'fast-zlib';
import { config } from 'dotenv';
import handlers from './handlers/handlers.index';
import { statusTypesArray, apiBaseURL } from './utils';
import { Cache } from './caches/base';
import { MessageRaw } from './structures/MessageRaw';
// import { connect } from './client_functions';

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
}

export interface ClientOptions {
  browser?: string;
  device?: string;
  prefix?: string;
  cacheChannels?: boolean;
  cacheGuilds?: boolean;
  cacheUsers?: boolean;
  cacheMembers?: boolean;
  activity?: { name: string, type: number };
  status?: 'online' | 'idle' | 'dnd' | 'invisible';
}

export interface StatusInfo {}

/**
 * @param {string} token The client's token used for gateway connection.
 * @param {any} socket The socket.
 * @param {any} config The configurations.
 */
export class Client extends Emitter {
  token: string;
  socket: any;
  activities: any;
  hb: any;
  config: ClientOptions;
  cache: any;

  /**
   * The main client constructor.
   * @param {string} token The client's token used for gateway connection.
   * @param {ClientOptions} [options] Options this client is instantiated with.
   */
  constructor(token: string, options?: ClientOptions) {
    super();
    if (!token) throw new Error(`${red.bold('[ERROR/Websocket]')} ${red('Expected a client token')}`);
    // Using 'Object.defineProperty()' to prevent the token from being enumerable.
    Object.defineProperty(this, 'token', {
      value: token,
      writable: true,
      enumerable: false
    });
    this.config = options || {
      browser: 'ourcord (https://github.com/ourcord/ourcord)',
      device: 'ourcord (https://github.com/ourcord/ourcord)',
      status: 'dnd'
    };
    this.cache = new Cache(this, this.config);
  }

  /**
   * Requests to a specific discord API endpoint.
   * @param {string} method method, e.g: GET, POST, DELETE, PUT, etc.
   * @param {string} path path of URL.
   * @param {object} body body/data of Request.
   * @returns {Promise<object>}
   */
  async request(method: string, path: string, body: object = null): Promise<object> {
    return (await fetch(apiBaseURL + path, {
      method: method,
      headers: {
        'Authorization': `Bot ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : null
    }).then(res => res.json()));
  };

  /**
   * The method used to connect to the gateway.
   * @returns {undefined}
   */
  connect(): void {
    this.emit('debug', `${yellow.bold('[NOTICE/Websocket]')} ${yellow('Attempting to connect to the discord gateway')}`);
    // eslint-disable-next-line new-cap
    this.socket = new ws('wss://gateway.discord.gg/?v=6&encoding=json');
    this.socket.once('open', () => {
      this.emit('debug', `${yellow.bold('[NOTICE/Websocket]')} ${yellow('Attempting to login')}`);
      const data = JSON.stringify(this.getMetaData());
      this.socket.send(data);
      this.socket.once('error', (error: string) => handlers.errorHandler(error, this));
      this.socket.on('message', (message: any, flag: any) => handlers.messageHandler(message, flag, this));
      this.socket.on('close', (h: any) => {
        clearInterval(this.hb);
        this.emit('debug', `${bold('[NOTICE/Websocket]')} ${red(`Connection closed unexpectedly (code ${h}). Re-attempting login`)}`);
        this.connect();
      });
    });
  };

  /**
   * The method used to destroy the client and close the connection to the websocket.
   * @param {string} [reason] The reason to close the socket.
   * @returns {undefined}
   */
  destroy(reason?: string): void {
    this.socket.close();
    this.emit('debug', `${red.bold('[NOTICE/Websocket]')} ${red(reason || 'The websocket was closed')}`);
  };

  /**
   * The method used to send a message to a TextChannel.
   * @param {string} channel ID of the TextChannel the message will be sent in.
   * @param {(string|object)} content The body of the message.
   * @returns {Promise<MessageRaw>}
   */
  async _sendMessage(channel: string, content: string | object): Promise<MessageRaw> {
    let b: MessageProperties = {};
    if (content === null || typeof content === 'undefined' || !content.toString().length) throw new Error(`${red.bold('[ERROR/DiscordAPI Error]')} Cannot send a message with no content`);
    if (typeof content === 'string') b.content = content;
    if (typeof content === 'object') b = content;
    return (await this.request("POST", `/channels/${channel}/messages`, b));
  };

  /**
   * The method used to send an embed in a TextChannel.
   * @param {string} channel ID of the TextChannel the embed will be sent in.
   * @param {EmbedProperties} options The embed data.
   * @returns {Promise<object>}
   */
  async _MessageEmbed(channel: string, options: EmbedProperties): Promise<object> {
    if (options === null || typeof options === 'undefined') throw new Error(`${red.bold('[ERROR/DiscordAPI Error]')} Cannot send a message with no content`);
    return (await this.request('POST', `/channels/${channel}/messages`, options));
  };

  /**
   * The method used to fetch a user from the rest discord API.
   * @param {string} userID The ID of the user to fetch.
   * @returns {Promise<object>}
   */
  async _GetRestUser(userID: string): Promise<object> {
    if (userID === null || typeof userID === 'undefined' || !userID.toString().length) throw new Error(`${red.bold('[ERROR/DiscordAPI Error]')} ${userID} is not snowflake`);
    return (await this.request('GET', `/users/${userID}`));
  };

  /**
   * The method used to get the metadata.
   * @returns {object}
   */
  getMetaData(): object {
    return {
         op: 2, // opcode of 2 means "identify"
         d: { // d is for data
           token: this.token,
           properties: {
             $os: os.platform,
             $browser: this.config.browser,
             $device: this.config.device
           },
           presence: {
             // activities: [{name: this.config.activity.name ? this.config.activity.name : null, type: 0}],
             status: this.config.status
           }
         }
       };
  };

  /**
   * Evaluates under the hood stuff.
   * @param {any} data The data to evaluate.
   * @param {any} flag The flags for evaluation.
   * @return {string}
   */
  evaluate(data: any, flag: any) {
    if (typeof flag !== 'object') flag = {};
    if (flag.binary === null || typeof flag.binary === 'undefined') return JSON.parse(data);
    const inflateData = new pako.Inflate();
    inflateData.push(data);
    if (inflateData.err) throw new Error(`${red.bold('[ERROR/Pako Error]')} An error occured while decompressing data`);
    return JSON.parse(inflateData.toString());
  };

  /**
   * The method used to set the status of the client.
   * @param {('online'|'idle'|'dnd'|'invisible')} t The status type to set client's status to.
   * @returns {undefined}
   */
  setStatus(t: 'online' | 'idle' | 'dnd' | 'invisible'): void {
    if (!statusTypesArray.includes(t)) throw new Error(`${red.bold('[ERROR/DiscordAPI Error]')} Invalid status type`);
    try {
      const p = JSON.stringify({
        op: 3,
        d: {
          status: t,
          afk: false,
          since: t === 'idle' ? Date.now() : null,
          game: null
        }
      });
      this.socket.send(p);
    } catch (err) {
      throw new Error(err);
    }
  };

  /**
   * The method used to create a GuildChannel.
   * @param {string} g ID of the guild where the channel will be created in.
   * @param {string} name The name of the channel.
   * @returns {Promise<object>}
   */
  async createChannel(g: string, name: string): Promise<object> {
    if (typeof g !== 'string') throw new Error(`${red.bold('[ERROR/DiscordAPI Error]')} ${g} is not snowflake`);
    if (typeof name !== 'string') throw new Error(`${red.bold('[ERROR/DiscordAPI Error]')} The channel name is required`);
    return (await this.request(`POST`, `/guilds/${g}/channels`, { name }));
  };
}

export default Client;
