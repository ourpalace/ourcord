/* eslint-disable */

export default class User {
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
