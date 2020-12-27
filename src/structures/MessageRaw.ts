/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
import {RawMessageProps, ReplyProps} from "../websocket";
import { User } from "./User";

export class MessageRaw {
    id: string;
    channel_id: string;
    channel_type: number;
    guild_id: string;
    author: User;
    member: object;
    content: string | object;
    timestamp: number;
    tts: boolean;
    mention_everyone: boolean;
    mentions: object;
    mention_roles: object;
    mention_channels: object;
    attachments: object;
    embeds: object;
    reactions: object;
    pinned: boolean;
    type: string;
    stickers: object;
    message_reference: ReplyProps;
    referenced_message: object;
    embed: RawMessageProps["embed"];
}
