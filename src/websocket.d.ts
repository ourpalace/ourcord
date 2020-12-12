// <reference types="node" />

import { EventEmitter as Emitter } from "events";

export interface messageProperties {
    content?: string
}

export interface embedProperties {
	embed?: {
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
}

export class Client extends Emitter {
    token: string;
    socket: typeof Emitter;
    constructor(token: string);
    login(): void;
    getMetaData(): {
        op: number;
        d: {
            token: string,
            properties: {
                $os: any;
                $browser: string;
                $device: string;
            };
        };
    };
    messageHandler(message: string, flag: any, websocket: any): void;
    errorHandler(error: string, emitter: Emitter): void;
    sendMessage(channel: string, content: string | object): Promise<JSON>;
    MessageEmbed(channel: string, options: embedProperties): Promise<JSON>;
}

export default Client;
