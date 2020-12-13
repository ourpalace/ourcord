// <reference types="node" />

import {EventEmitter as Emitter} from 'events';

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
		color: embedProperties['embed']['colour'];
		footer: object;
		image: string;
	};
}

export interface ClientOptions {
	browser?: string;
    device?: string;
    prefix?: string;
	cacheGuilds?: boolean;
	cacheUsers?: boolean;
	activity?: {name: string, type: number};
	status?: 'dnd' | 'invisible' | 'online' | 'idle';
}

export class Client extends Emitter {
    token: string;
    socket: typeof Emitter;
    config: ClientOptions;
    /**
     *
     * @param {string} token the token used for auth
     * @param {ClientOptions} options options under client that do stuff
     */
    constructor(token: string, options?: ClientOptions);
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
    _sendMessage(channel: string, content: string | object): Promise<JSON>;
    _MessageEmbed(channel: string, options: embedProperties): Promise<JSON>;
}

declare module "Client"

export default Client;
