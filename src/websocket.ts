// initial imports
import ws from "ws";
import fetch from "node-fetch";
import { EventEmitter as Emitter } from "events";
import { red, green, yellow, bold } from "chalk";
import os from "os"
import handleErr from "./handlers/error";
import handleMessage from "./handlers/message";
import zlib from "zlib-sync";

export interface messageProperties {
	content?: string;
	timestamp: number;
}

export interface embedProperties {
	embed: {
		title: string;
		author: object;
		thumbnail: string;
		description: string;
		fields: object[];
		colour: string | number;
		color: embedProperties["embed"]["colour"];
		footer: object;
		image: string;
	};
};

export class Client extends Emitter {
	token: string;
	socket: any;
	constructor(token?: string) {
		super();
		if (!token) throw new Error(`${red.bold("[ERROR/websocket]")} ${red("No token was provided")}`);
		this.token = token;
	}
	connect() {
		this.emit("debug", `${green.bold("[NOTICE/websocket]")} ${yellow("Attempting to connect to the discord gateway")}`)
		this.socket = new ws("wss://gateway.discord.gg/?v=6&encoding=json");
		this.socket.once("open", () => {
			this.emit("debug", `${green.bold("[NOTICE/websocket]")} ${green("Attempting to login")}`);
			const data = JSON.stringify(this.getMetaData());
			this.socket.send(data);
			this.socket.once("error", (error: string) => {
				handleErr(error, this.socket)
			});
			this.socket.on("message", (message: any, flag: any) => {
				console.log(message);
				console.log(flag);
				console.log(this);

				handleMessage(message, flag, this)
			});
			this.socket.on("close", () => {
				this.emit("debug", `${bold("[NOTICE/websocket]")} Connection closed unexpectedly. Re-attempting login`);
				this.connect();
			});
			
		});
	}
	sendMessage(t: string, channelId: string) {
		try{
			fetch(`https://discord.com/api/v6/channels/${channelId}/messages`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({content: t})
			});
		} catch (err) {
			handleErr(err.stack, this.socket);
		}
	}
	getMetaData():object {
		const metaData = {
			op: 2,			// opcode of 2 means "identify"
			d: {			// d is for data
				token: this.token,
				properties: {
					$os: os.platform,
					$browser: "ourcord (https://github.com/alebot-dev/our.discord)",
					$device: "ourcord (https://github.com/alebot-dev/our.discord)"
				}
			}
		};
		return metaData;
	}
	evaluate(data: any, flag: any) {
		if (typeof flag !== "object") flag = {};
		if (!flag.binary) return JSON.parse(data);
		const inflateData = new zlib.Inflate();
		inflateData.push(data, zlib.Z_SYNC_FLUSH);
		if (inflateData.err) throw new Error("An error occured while decompressing data");
		return JSON.parse(inflateData.toString());
	}
}
