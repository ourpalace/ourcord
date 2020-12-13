export class Message {
    id: string;
    channel: object;
    guild: object;
    author: object;
    member: object;
    content: string | object;
    timestamp: number;
    tts: boolean;
    mention_everyone: boolean;
    mentions: object;
    mention_roles: object;
    mention_channels: object;
    attachments: object;
    embeds: object;
    reactions: object;
    pinned: boolean;
    type: string;
    stickers: object;
    referenced_message: object;
    constructor(data, client) {
        this.id = data.id
        this.channel = {
            id: data.channel_id,
            send: function (content) {
                client._sendMessage(this.id, content)
            }
        }
        this.guild = {
            id: data.guild_id
        }
        this.author = data.author
        this.member = data.member
        this.content = data.content
        this.timestamp = data.timestamp
        this.tts = data.tts
        this.mention_everyone = data.mention_everyone
        this.mentions = data.mentions
        this.mention_roles = data.mention_roles
        this.mention_channels = data.mention_channels
        this.attachments = data.attachments
        this.embeds = data.embeds
        this.reactions = data.reactions
        this.pinned = data.pinned
        this.type = data.type
        this.stickers = data.stickers
        this.referenced_message = data.referenced_message
        return this;
    }
}