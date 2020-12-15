"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    constructor(data, client) {
        this.id = data.id;
        this.channel = {
            id: data.channel_id,
            send: async function (content) {
                const r = await client._sendMessage(data.channel_id, content);
                return new Message(r, client);
            }
        };
        this.guild = {
            id: data.guild_id
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
            roles: data.mention_roles
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
exports.Message = Message;
