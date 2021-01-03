/* eslint-disable require-jsdoc */
import {Message} from './Message';
import {MessageRaw} from './MessageRaw';
import {Client, MessageProperties} from '../websocket';
import {ChannelRaw} from './ChannelRaw';
import {Guild} from './Guild';

export class Channel {
  readonly id: string;
  readonly type: number;
  readonly position?: number;
  readonly permissionOverwrites?: object;
  readonly name?: string;
  readonly topic?: string;
  readonly nsfw?: boolean;
  readonly lastMessageId?: string;
  readonly bitrate?: number;
  readonly userLimit?: number;
  readonly ratelimitPerUser?: number;
  readonly recipients?: object;
  readonly icon?: string;
  readonly lastPinTimestamp?: Date;
  readonly guild?: Guild
  constructor(data: ChannelRaw, client: Client) {
    this.id = data.id;
    this.type = data.type;
    this.position = data.position;
    this.permissionOverwrites = data.permission_overwrites;
    this.name = data.name;
    this.topic = data.topic;
    this.nsfw = data.nsfw;
    this.lastMessageId = data.last_message_id;
    this.ratelimitPerUser = data.rate_limit_per_user;
    this.recipients = data.recipients;
    this.icon = data.icon;
    this.lastPinTimestamp = data.last_pin_timestamp;
    this.guild = client.cache.guilds.get(data.guild_id);
    return this;
  }
  async send(content: string | MessageProperties): Promise<Message> {
    const client = Client.prototype;
    const data = MessageRaw.prototype;
    const r = await client._sendMessage(data.channel_id, content);
    return new Message(r, client);
  };
};
