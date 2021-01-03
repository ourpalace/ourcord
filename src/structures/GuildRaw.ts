/* eslint-disable camelcase */
import {Channel} from './Channel';
import {Emoji} from './Emoji';
import {Member} from './Member';
import {Role} from './Role';

export interface GuildRaw {
    id?: string;
    name?: string;
    icon?: string;
    description?: string;
    splash?: string;
    discovery_splash?: string;
    features?: string[];
    emojis?: Emoji[];
    banner?: string;
    owner_id?: string;
    application_id?: string;
    region?: string;
    afk_channel_id?: string;
    afk_timeout?: number;
    system_channel_id?: string;
    widget_enabled?: boolean;
    widget_channel_id?: string;
    verification_level?: number;
    roles?: Role[];
    default_message_notifications?: number;
    mfa_level?: number;
    explicit_content_filter?: number;
    max_presences?: number;
    max_members?: number;
    vanity_url_code?: string;
    premium_tier?: number;
    premium_subscription_count?: number;
    system_channel_flags?: number;
    preferred_locale?: string;
    rules_channel_id?: string;
    public_updates_channel_id?: string;
    unavailable?: boolean;
    approximate_member_count?: number;
    approximate_presence_count?: number;
    channels?: Map<string, Channel>;
    members?: Map<string, Member>;
}
