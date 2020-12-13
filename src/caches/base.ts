import { Channel } from "../structures/types";
import { Guild } from "../structures/types";
import { User } from "../structures/types";
import { Member } from "../structures/types";
import Client, { ClientOptions } from "../websocket";

export class Cache {
    options: ClientOptions;
    channels: Channel;
    guilds: Guild;
    users: User;
    members: Member;

    constructor(client: Client, options?: ClientOptions) {
        this.channels = options.cacheChannels ? new Map() : null;
        this.guilds = options.cacheGuilds ? new Map() : null;
        this.users = options.cacheChannels ? new Map() : null;
        this.members = options.cacheMembers ? new Map() : null;
        this._bind(client);
    }
    
    _bind(client: Client) {
        client.cache = {}
        client.cache.channels = this.channels
        client.cache.guilds = this.guilds
        client.cache.users = this.users
        client.cache.members = this.members
    }
}