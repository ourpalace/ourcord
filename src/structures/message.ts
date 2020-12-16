/* eslint-disable require-jsdoc */
import Client from '../websocket';
import {MessageRaw} from './MessageRaw';
import {Channel} from "./channel";

export class Message {
    id: string;
    channel: Channel;
    guild: object;
    author: object;
    member: object;
    content: string | object;
    timestamp: number;
    tts: boolean;
    mentions: object;
    attachments: object;
    embeds: object;
    reactions: object;
    pinned: boolean;
    type: string;
    stickers: object;
    replyTo: object;
    /**
     *
     * @param {any} data the raw message
     * @param {any} client the client
     */
    constructor(data: MessageRaw, client: Client) {
      this.id = data.id;
      this.channel = {
        type: data.channel_type,
        id: data.channel_id,
        send: async function(content: string) {
          const r = await client._sendMessage(data.channel_id, content);
          return new Message(r, client);
        },
      };
      this.guild = {
        id: data.guild_id,
      };
      this.author = data.author;
      this.member = data.member;
      this.content = data.content;
      this.timestamp = data.timestamp;
      this.tts = data.tts;
      this.mentions = {
        everyone: data.mention_everyone,
        channels: data.mention_channels,
        users: data.mentions,
        roles: data.mention_roles,
      };
      this.attachments = data.attachments;
      this.embeds = data.embeds;
      this.reactions = data.reactions;
      this.pinned = data.pinned;
      this.type = data.type;
      this.stickers = data.stickers;
      this.replyTo = data.referenced_message;
      return this;
    }
}
