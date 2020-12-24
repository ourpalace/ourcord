/* eslint-disable */

export class User {
    id: string;
    username: string;
    name: string;
    discriminator: string;
    avatar: string;
    bot: boolean;
    flags: number;
    constructor(r: User) {
        this.id = r.id;
        this.username = r.username;
        this.name = r.username; // alias for this.username;
        this.discriminator = r.discriminator;
        this.avatar = r.avatar;
        this.bot = r.bot;
        this.flags = r.flags;
    }
}
