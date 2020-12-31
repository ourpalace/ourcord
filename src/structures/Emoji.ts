import Client from '../websocket';
import { EmojiRaw } from './EmojiRaw';
import { GuildRaw } from './GuildRaw';

export class Emoji {
    id?: string;
    name?: string;
    roles?: string[];
    guild?: GuildRaw;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    url?: (format?: string) => string;
    rename?: (name: string) => Promise<EmojiRaw>;
    delete?: () => Promise<boolean>;

    constructor(data: EmojiRaw, client: Client, guild: GuildRaw) {
        this.id = data.id || null;
        this.name = data.name || null;
        this.roles = data.roles || null;
        this.guild = guild || null;
        this.require_colons = data.require_colons || null;
        this.managed = data.managed || null;
        this.animated = data.animated || null;
        this.url = this.id ? (format?: string) => `https://cdn.discordapp.com/emojis/${this.id}.${['webp', 'jpeg', 'jpg', 'png'].includes(typeof format === 'string' ? format.toLowerCase() : '') ? format.toLowerCase() : (this.animated === true ? 'gif' : 'webp')}` : null;
        this.rename = async (name: string) => {
            const r = await client._modifyEmoji(this.guild.id, this.id, name);
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
