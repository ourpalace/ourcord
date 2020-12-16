/* eslint-disable comma-dangle */
// initial imports
// eslint-disable-next-line spaced-comment
/// <reference types="node" />

import ws from 'ws';
import fetch from 'node-fetch';
import {EventEmitter as Emitter} from 'events';
import {red, yellow, bold} from 'chalk';
import os from 'os';
import pako from 'pako';
// @ts-ignore
import {config} from 'dotenv';
import handlers from './handlers/handlers.index';
import {statusTypesArray, apiBaseURL} from './utils';
import {Cache} from './caches/base';
import {MessageRaw} from './structures/MessageRaw';

config();

export type WSProperties = {
  readonly ping: number;
}

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
  intents?: number;
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
  ws: WSProperties

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
   * @return {Promise<any>}
   */
  async request(method: string, path: string, body: object = null): Promise<any> {
    return (await fetch(apiBaseURL + path, {
      method: method,
      headers: {
        'Authorization': `Bot ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : null
    }).then((res) => res.json()));
  };

  /**
   * The method used to connect to the gateway.
   * @return {undefined}
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
        if (h === 4004) throw new Error(`${red.bold('[NOTICE/Websocket]')} ${red(`Invalid client token`)}`);
        this.emit('debug', `${bold('[NOTICE/Websocket]')} ${red(`Connection closed unexpectedly (code ${h}). Re-attempting login`)}`);
        this.connect();
      });
    });
  };

  /**
   * The method used to destroy the client and close the connection to the websocket.
   * @param {string} [reason] The reason to close the socket.
   * @return {undefined}
   */
  destroy(reason?: string): void {
    this.socket.close();
    this.emit('debug', `${red.bold('[NOTICE/Websocket]')} ${red(reason || 'The websocket was closed')}`);
  };

  /**
   * The method used to send a message to a TextChannel.
   * @param {string} channel ID of the TextChannel the message will be sent in.
   * @param {(string|object)} content The body of the message.
   * @return {Promise<MessageRaw>}
   */
  async _sendMessage(channel: string, content: string | object): Promise<MessageRaw> {
    let b: MessageProperties = {};
    if (content === null || typeof content === 'undefined' || !content.toString().length) throw new Error(`${red.bold('[ERROR/DiscordAPI Error]')} ${red("Cannot send a message with no content")}`);
    if (typeof content === 'string') b.content = content;
    if (typeof content === 'object') b = content;
    return (await this.request("POST", `/channels/${channel}/messages`, b));
  };

  /**
   * The method used to send an embed in a TextChannel.
   * @param {string} channel ID of the TextChannel the embed will be sent in.
   * @param {EmbedProperties} options The embed data.
   * @return {Promise<object>}
   */
  async _MessageEmbed(channel: string, options: EmbedProperties): Promise<any> {
    if (options === null || typeof options === 'undefined') throw new Error(`${red.bold('[ERROR/DiscordAPI Error]')} Cannot send a message with no content`);
    return (await this.request('POST', `/channels/${channel}/messages`, options));
  };

  /**
   * The method used to fetch a user from the rest discord API.
   * @param {string} userID The ID of the user to fetch.
   * @return {Promise<object>}
   */
  async _GetRestUser(userID: string): Promise<any> {
    if (userID === null || typeof userID === 'undefined' || !userID.toString().length) throw new Error(`${red.bold('[ERROR/DiscordAPI Error]')} ${userID} is not snowflake`);
    return (await this.request('GET', `/users/${userID}`));
  };

  /**
   * The method used to get the metadata.
   * @return {object}
   */
  getMetaData(): any {
    return {
      op: 2,
      d: {
        token: this.token,
        intents: this.config.intents,
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
  evaluate(data: any, flag: any): string {
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
   * @return {undefined}
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
   * @return {Promise<object>}
   */
  async createChannel(g: string, name: string): Promise<any> {
    if (typeof g !== 'string') throw new Error(`${red.bold('[ERROR/DiscordAPI Error]')} ${g} is not snowflake`);
    if (typeof name !== 'string') throw new Error(`${red.bold('[ERROR/DiscordAPI Error]')} The channel name is required`);
    return (await this.request(`POST`, `/guilds/${g}/channels`, {name}));
  };
}

export default Client;
