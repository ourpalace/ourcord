/* eslint-disable camelcase, require-jsdoc */
declare interface PermissionOverwritesRaw {
  id: string;
  type: number;
  allow: string;
  deny: string;
}

export class ChannelRaw {
  id: string;
  type: number;
  guild_id?: string;
  position?: number;
  permission_overwrites?: PermissionOverwritesRaw[];
  name?: string;
  topic?: string;
  nsfw?: boolean;
  last_message_id?: string;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: object[]; // This will be replaced later with a user class interface.
  icon?: string;
  owner_id?: string;
  application_id?: string;
  parent_id?: string;
  last_pin_timestamp?: Date;
}
