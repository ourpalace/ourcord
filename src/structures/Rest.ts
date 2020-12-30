/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
import Client from '../websocket';
import { User } from './User';

export class Rest {
  id: string;
  user_id: string;
  user: object;

  /**
   * The rest constructor.
   * @param {Rest} data The rest data.
   * @param {Client} client The client.
   */
  constructor(data: Rest, client: Client) {
    this.id = data.id;
    this.user = {
      id: data.user_id,
      user: async function () {
        const r = await client._GetRestUser(data.user_id);
        return new User(r);
      }
    };
  }
}
