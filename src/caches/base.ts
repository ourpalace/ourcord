/* eslint-disable require-jsdoc */
import Client, {ClientOptions} from '../websocket';
import FakeMap from './Map';

export class Cache {
    options: ClientOptions;
    channels: FakeMap | null;
    guilds: FakeMap | null;
    users: FakeMap | null;
    members: FakeMap | null;

    constructor(client: Client, options?: ClientOptions) {
      this.channels = options.cacheChannels === false ? null : new FakeMap();
      this.guilds = options.cacheGuilds === false ? null : new FakeMap();
      this.users = options.cacheChannels === false ? null : new FakeMap();
      this.members = options.cacheMembers === false ? null : new FakeMap();
      this._bind(client);
    }

    _bind(client: Client) {
      client.cache = {
        channels: this.channels,
        guilds: this.guilds,
        users: this.users,
        members: this.members,
      };
    }
}
