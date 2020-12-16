/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
import {Message} from "./message";

export class Channel {
  readonly id: string;
  readonly type: number;
  readonly position?: number;
  readonly permission_overwrites?: object;
  readonly name?: string;
  readonly topic?: string;
  readonly nsfw?: boolean;
  readonly last_message_id?: string;
  readonly bitrate?: number;
  readonly user_limit?: number;
  readonly rate_limit_per_user?: number;
  readonly recipients?: object;
  readonly icon?: string;
  readonly owner_id?: string;
  readonly application_id?: string;
  readonly parent_id?: string;
  readonly last_pin_timestamp?: string;
  send: (content: string) => Promise<Message>
  constructor() {
    return this;
  }
};
