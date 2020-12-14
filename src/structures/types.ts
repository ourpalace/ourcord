export interface Channel {}

export interface Guild {
    id?: string,
    name?: string,
    icon?: string,
    description?: string,
    splash?: string,
    discovery_splash?: string,
    features?: Array<string>,
    emojis?: Array<Emoji>,
    banner?: string,
    owner_id?: string,
    application_id?: string,
    region?: string,
    afk_channel_id?: string,
    afk_timeout?: number,
    system_channel_id?: string,
    widget_enabled?: boolean,
    widget_channel_id?: string,
    verification_level?: number,
    roles?: Array<Role>,
    default_message_notifications?: number,
    mfa_level?: number,
    explicit_content_filter?: number,
    max_presences?: number,
    max_members?: number,
    vanity_url_code?: string,
    premium_tier?: number,
    premium_subscription_count?: number,
    system_channel_flags?: number,
    preferred_locale?: string,
    rules_channel_id?: string,
    public_updates_channel_id?: string,
    unavailable?: boolean,
    approximate_member_count?: number,
    approximate_presence_count?: number,
    channels?: Map<string, Channel>,
    members?: Map<string, Member>,
}

export interface User {}

export interface Member {}

export interface Channel {}

export interface Role {}

export interface Emoji {
    id?: string,
    name?: string,
    roles?: Array<Role>,
    guild?: Guild,
    user?: {
        username?: string,
        discriminator?: string,
        id?: string,
        avatar?: string
    },
    require_colons?: boolean,
    managed?: boolean,
    animated?: boolean,
    url?: Function,
    rename?: Function,
    delete?: Function,
}
