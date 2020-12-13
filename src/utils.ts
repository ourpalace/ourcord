export const statusTypesArray = ['online', 'dnd', 'idle', 'invisible'];
export const activityTypesArray = ['COMPETING', 'LISTENING', 'STREAMING', 'PLAYING'];
/**
 *
 * @param {string} token the clients token
 * @return {string} the auth header used by Discord
 */
export function authHeader(token: string) {
  return `Bot ${token}`;
}
