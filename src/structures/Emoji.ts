import Client from '../websocket';
import { EmojiRaw } from './EmojiRaw';
import {Guild} from './Guild';

export class Emoji {
    id?: string
    name?: string
    roles?: Array<string>
    guild?: Guild
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
        this.require_colons = data.require_colons || null;
        this.managed = data.managed || null;
        this.animated = data.animated || null;
        if (this.id) {
            this.url = (format?:string) => {
                let cf: string;
                switch (format) {
                    case "png": cf = "png"; break;
                    case "webp": cf = "webp"; break;
                    default: cf = this.animated ? "gif" : "png"; break;
                }
                return `https://cdn.discordapp.com/emojis/${this.id}.${cf}`;
            };
        } else {
            this.url = this.name ? `https://twemoji.maxcdn.com/v/latest/72x72/${this.name.codePointAt().toString(16)}.png` : null;
        }
        this.rename = async (name:string) => {
            const r = await client._modifyEmoji(this.guild.id, this.id, name, undefined);
            this.name = r.name || null;
            return r;
        };
        this.delete = async () => {
            const r = await client._deleteEmoji(this.guild.id, this.id);
            return r;
        };
        return this;
    }
}
