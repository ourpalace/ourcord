/* eslint-disable camelcase */
import Client from '../websocket';

export class User {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    verified: boolean;
    email: string;
    flags: number;
    premium_type: number;
    public_flags: number;
    constructor(r: object) {}
}
export class Rest {
id: string;
user_id: string;
user: object;
/**
 *
 * @param {any} data
 * @param {any} client
 */
constructor(data: Rest, client: Client) {
  this.id = data.id;
  this.user = {
    id: data.user_id,
    user: async function() {
      const r = await client._GetRestUser(data.user_id);
      return new User(r);
    },
  };
}
}
