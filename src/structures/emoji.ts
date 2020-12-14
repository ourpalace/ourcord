import Client from '../websocket';
import { EmojiRaw } from './EmojiRaw';
import { Guild } from './types';

export class Emoji {
    id?: string
    name?: string
    roles?: Array<string>
    guild?: Guild
    user?: {
        username?: string,
        discriminator?: string,
        id?: string,
        avatar?: string
    }
    require_colons?: boolean
    managed?: boolean
    animated?: boolean
    url?: Function
    rename?: Function
    delete?: Function

    constructor(data: EmojiRaw, client: Client, guild: Guild) {
        this.id = data.id || null;
        this.name = data.name || null;
        this.roles = data.roles || null;
        this.guild = guild;
        if (data.user) {
            this.user = {};
            this.user.username = data.user.username || null;
            this.user.discriminator = data.user.discriminator || null;
            this.user.id = data.user.id || null;
            this.user.avatar = data.user.avatar || null;
        } else this.user = null;
        this.require_colons = data.require_colons || null;
        this.managed = data.managed || null;
        this.animated = data.animated || null;
        if (this.id) {
            this.url = (format?:string) => {
                let cf: string;
                switch (format) {
                    case "png": cf = "png"; break;
                    case "webp": cf = "webp"; break;
                    default: this.animated == true ? cf = "gif" : "png"; break;
                }
                return `https://cdn.discordapp.com/emojis/${this.id}.${cf}`;
            };
        } else this.url = null;
        this.rename = async (name:string) => {
            const r = await client._modifyEmoji(this.guild.id, this.id, name, undefined);
            this.name = r.name || null;
            return r;
        }
        this.delete = async () => {
            const r = await client._deleteEmoji(this.guild.id, this.id);
            return r;
        }
        return this;
    }
}