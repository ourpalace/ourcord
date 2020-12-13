export let statusArray = ['online', 'dnd', 'idle', 'invisible']
export function authHeader(token: string){return `Bot ${token}`}