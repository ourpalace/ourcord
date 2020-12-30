/* eslint-disable require-jsdoc */
import {Channel} from "../structures/Channel";
import {Guild} from "../structures/Guild";
import {User} from "../structures/User";
import {Member} from "../structures/Member";
import Client, {ClientOptions} from "../websocket";

export class Cache {
    options: ClientOptions;
    channels: Map<string, Channel>;
    guilds: Map<string, Guild>;
    users: Map<string, User>;
    members: Map<string, Member>;

    constructor(client: Client, options?: ClientOptions) {
      this.channels = options.cacheChannels === false ? null : new Map();
      this.guilds = options.cacheGuilds === false ? null : new Map();
      this.users = options.cacheChannels === false ? null : new Map();
      this.members = options.cacheMembers === false ? null : new Map();
      this._bind(client);
    }

    _bind(client: Client) {
      client.cache = {};
      client.cache.channels = this.channels;
      client.cache.guilds = this.guilds;
      client.cache.users = this.users;
      client.cache.members = this.members;
    }
}
