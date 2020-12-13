import { Channel } from "../structures/types";
import { Guild } from "../structures/types";
import { User } from "../structures/types";
import { Member } from "../structures/types";
import { ClientOptions } from "../websocket";

export class Cache {
    options: ClientOptions;
    channels: Channel;
    guilds: Guild;
    users: User;
    members: Member;

    constructor(options?: ClientOptions) {
        this.channels = options.cacheChannels ? new Map() : null;
        this.guilds = options.cacheGuilds ? new Map() : null;
        this.users = options.cacheChannels ? new Map() : null;
        this.members = options.cacheMembers ? new Map() : null;
    }
}