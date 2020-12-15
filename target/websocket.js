"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
// initial imports
const ws_1 = __importDefault(require("ws"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const events_1 = require("events");
const chalk_1 = require("chalk");
const os_1 = __importDefault(require("os"));
const pako_1 = __importDefault(require("pako"));
const dotenv_1 = require("dotenv");
const handlers_index_1 = __importDefault(require("./handlers/handlers.index"));
const utils_1 = require("./utils");
// import { connect } from "./client_functions";
dotenv_1.config();
;
/**
 * @param {string} token the token used to login to the gateway
 * @param {any} socket
 * @param {any} config
 */
class Client extends events_1.EventEmitter {
    /**
     *
     * @param {string} token  the token used to login to the gateway
     * @param {any} options ClientOptions
     */
    constructor(token, options) {
        super();
        if (!token)
            throw new Error(`${chalk_1.red.bold('[ERROR/websocket]')} ${chalk_1.red('No token was provided')}`);
        this.token = token;
        if (!options) {
            this.config = {
                browser: 'ourcord (https://github.com/ourcord/ourcord)',
                device: 'ourcord (https://github.com/ourcord/ourcord)',
                status: 'dnd',
            };
        }
        else
            this.config = options;
    }
    connect() {
        this.emit('debug', `${chalk_1.yellow.bold('[NOTICE/websocket]')} ${chalk_1.yellow('Attempting to connect to the discord gateway')}`);
        // eslint-disable-next-line new-cap
        this.socket = new ws_1.default('wss://gateway.discord.gg/?v=6&encoding=json');
        this.socket.once('open', () => {
            this.emit('debug', `${chalk_1.yellow.bold('[NOTICE/websocket]')} ${chalk_1.yellow('Attempting to login')}`);
            const data = JSON.stringify(this.getMetaData());
            this.socket.send(data);
            this.socket.once('error', (error) => {
                handlers_index_1.default.errorHandler(error, this);
            });
            this.socket.on('message', (message, flag) => {
                handlers_index_1.default.messageHandler(message, flag, this);
            });
            this.socket.on('close', () => {
                this.emit('debug', `${chalk_1.bold('[NOTICE/websocket]')} Connection closed unexpectedly. Re-attempting login`);
                this.connect();
            });
        });
    }
    ;
    /**
 *
 * @param {string} reason the reason the socket was closed
 */
    destroy(reason) {
        this.socket.close();
        this.emit('debug', `${chalk_1.red.bold('[NOTICE/websocket]')} ${chalk_1.red(reason ? reason : 'The websocket was closed')}`);
    }
    ;
    /**
*
* @param {string} channel the channel ID which the message will be sent in
* @param {any} options the body of the message
*/
    async _sendMessage(channel, content) {
        const url = `https://discord.com/api/v7/channels/${channel}/messages`;
        let b = {};
        if (!content || !content.toString().length)
            throw new Error('[ERROR/discordAPI error] Cannot send a message with no content');
        if (typeof content === 'string')
            b.content = content;
        if (typeof content === 'object')
            b = content;
        const sent = await node_fetch_1.default(url, {
            method: 'POST',
            headers: {
                'Authorization': utils_1.authHeader(this.token),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(b),
        });
        return await sent.json();
    }
    ;
    /**
 *
 * @param {string} channel the channel ID which the message will be sent in
 * @param {any} options the properties of the embed
 */
    async _MessageEmbed(channel, options) {
        const url = `https://discord.com/api/v7/channels/${channel}/messages`;
        if (!options)
            throw new Error('[ERROR/discordAPI error] Cannot send a message with no content');
        const data = await node_fetch_1.default(url, {
            method: 'POST',
            headers: {
                'Authorization': utils_1.authHeader(this.token),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(options),
        });
        return await data.json();
    }
    ;
    /**
     *
     * @param {string} userID the userID to get from Discord's rest API
     */
    async GetRestUser(userID) {
        const url = `https://discord.com/api/v7/users/${userID}`;
        if (!userID || !userID.toString().length)
            throw new Error('[ERROR/discordAPI error] Please provide a userID');
        const data = await node_fetch_1.default(url, {
            method: 'GET',
            headers: {
                'Authorization': utils_1.authHeader(this.token),
                'Content-Type': 'application/json',
            },
        });
        return await data.json();
    }
    ;
    getMetaData() {
        const metaData = {
            op: 2,
            d: {
                token: this.token,
                properties: {
                    $os: os_1.default.platform,
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
    }
    ;
    /**
 *
 * @param {any} data
 * @param {any} flag
 * @return {string}
 */
    evaluate(data, flag) {
        if (typeof flag !== 'object')
            flag = {};
        if (!flag.binary)
            return JSON.parse(data);
        const inflateData = new pako_1.default.Inflate();
        inflateData.push(data);
        if (inflateData.err)
            throw new Error('[ERROR/pako error] An error occured while decompressing data');
        return JSON.parse(inflateData.toString());
    }
    ;
    // eslint-disable-next-line require-jsdoc
    setStatus(t) {
        if (!utils_1.statusTypesArray.includes(t)) {
            throw new Error('[ERROR/discordAPI error] Status provided is incorrect');
        }
        try {
            this.socket.send(JSON.stringify({
                op: 3,
                d: {
                    status: t,
                    afk: false,
                },
            }));
        }
        catch (err) {
            throw new Error(err);
        }
    }
    /**
     *
     * @param {string} g the guild ID in which the channel should be created in
     * @param {string} name the name of the channel to be created
     */
    async createChannel(g, name) {
        const url = `https://discord.com/api/v7/guilds/${g}/channels`;
        const channel = await node_fetch_1.default(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': utils_1.authHeader(this.token),
            },
            body: JSON.stringify({
                name,
            }),
        }).then((c) => c.json());
        return channel;
    }
}
exports.Client = Client;
exports.default = Client;
