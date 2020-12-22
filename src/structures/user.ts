/* eslint-disable */

export default class User {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    verified: boolean;
    bot: boolean;
    email: string;
    flags: number;
    premium_type: number;
    public_flags: number;
    constructor(r: object) {
        this.id = r.id;
        this.username = r.username;
        this.name = r.username; // alias for this.username;
        this.discriminator = r.discriminator;
        this.avatar = r.avatar;
        this.verified = r.verified;
        this.email = r.email;
        this.bot = r.bot;
        this.flags = r.flags;
        this.premium_type = r.premium_type;
        this.public_flags = r.public_flags;
    }
}
