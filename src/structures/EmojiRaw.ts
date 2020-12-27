export interface EmojiRaw {
    id?: string,
    name?: string,
    roles?: Array<string>,
    user?: {
        username?: string,
        discriminator?: string,
        id?: string,
        avatar?: string
    },
    require_colons?: boolean,
    managed?: boolean,
    animated?: boolean
}