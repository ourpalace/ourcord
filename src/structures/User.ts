/* eslint-disable require-jsdoc */
export class User {
    id: string;
    username: string;
    name: string;
    tag: string;
    discriminator: string;
    avatar: string;
    bot: boolean;
    flags: number;
    constructor(r: User) {
      this.id = r.id;
      this.username = r.username;
      this.name = this.username; // alias for this.username;
      this.discriminator = r.discriminator;
      this.tag = this.username + '#' + this.discriminator;
      this.avatar = r.avatar;
      this.bot = r.bot;
      this.flags = r.flags;
    }
}
