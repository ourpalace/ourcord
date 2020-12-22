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
        this.id = object.id;
        this.username = object.username;
        this.name = object.username; // alias for this.username;
        this.discriminator = object.discriminator;
        this.avatar = object.avatar;
        this.verified = object.verified;
        this.email = object.email;
        this.bot = object.bot;
        this.flags = object.flags;
        this.premium_type = object.premium_type;
        this.public_flags = object.public_flags;
    }
}
