/* eslint-disable require-jsdoc */
import {GuildRaw} from './GuildRaw';

export class Guild {
  constructor(data: GuildRaw) {
    Object.assign(this, data); // I cba to actually write shit so here you go
    return this;
  }
};
