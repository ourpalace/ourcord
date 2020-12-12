// initial imports
import ws from "ws";
import fetch from "node-fetch";
import { EventEmitter as Emitter } from "events";
import { red, green, yellow } from "chalk";
import os from "os"
import handleErr from "./handlers/error";
import handleMessage from "./handlers/message";

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
		});
	}

	getMetaData():object {
		const metaData = {
			op: 2,			// opcode of 2 means "identify"
			data: {
				token: this.token,
				properties: {
					$os: os.platform,
					$browser: "ourcord",
					$device: "ourcord"
				}
			}
		};
		return metaData;
	}

}
