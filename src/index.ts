// initial imports
import ws from "ws";
import fetch from "node-fetch";
import { EventEmitter as Emitter } from "events";
import { bold, red } from "chalk";

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
		footer: object;
		image: string;
	};
};

export class Client extends Emitter {
	token: string;
	socket: ws;
	constructor(token?: string) {
		super();
		if (!token) throw new Error(`${red.bold("[ERROR/websocket-auth]")} ${red("No token was provided")}`);
		this.token = token;
	}
}
