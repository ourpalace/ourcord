/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
import { Message } from './Message';
import { MessageRaw } from './MessageRaw';
import { Client, MessageProperties } from '../websocket';
import { ChannelRaw } from './ChannelRaw';

export class Channel {
  readonly id: string;
  readonly type: number;
  readonly position?: number;
  readonly permission_overwrites?: object;
  readonly name?: string;
  readonly topic?: string;
  readonly nsfw?: boolean;
  readonly last_message_id?: string;
  readonly bitrate?: number;
  readonly user_limit?: number;
  readonly rate_limit_per_user?: number;
  readonly recipients?: object;
  readonly icon?: string;
  readonly owner_id?: string;
  readonly application_id?: string;
  readonly parent_id?: string;
  readonly last_pin_timestamp?: Date;
  constructor(data: ChannelRaw) {
    this.id = data.id;
    this.type = data.type;
    this.position = data.position;
    this.permission_overwrites = data.permission_overwrites;
    this.name = data.name;
    this.topic = data.topic;
    this.nsfw = data.nsfw;
    this.last_message_id = data.last_message_id;
    this.rate_limit_per_user = data.rate_limit_per_user;
    this.recipients = data.recipients;
    this.icon = data.icon;
    this.owner_id = data.owner_id;
    this.application_id = data.applcation_id;
    this.parent_id = data.parent_id;
    this.last_pin_timestamp = data.last_pin_timestamp;
    return this;
  }
  async send (content: string | MessageProperties): Promise<Message> {
    const client = Client.prototype;
    const data = MessageRaw.prototype;
    const r = await client._sendMessage(data.channel_id, content);
    return new Message(r, client);
  };
};
