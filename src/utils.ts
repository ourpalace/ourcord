export const statusTypesArray = ['online', 'dnd', 'idle', 'invisible'];
export const activityTypesArray = ['COMPETING', 'LISTENING', 'STREAMING', 'PLAYING'];
export function authHeader(token: string) {
  return `Bot ${token}`;
}
