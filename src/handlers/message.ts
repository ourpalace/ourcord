import { green, bold } from 'chalk';
import { Message } from '../structures/Message';

/**
 * The handler for the message.
 * @param {string} message The contents of the message.
 * @param {any} flag Flags.
 * @param {any} websocket The websocket.
 * @returns {any} The heartbeat.
 */
export default function handleMessage(message: string, flag: any, websocket: any) {
  const msg = websocket.evaluate(message, flag);
  websocket._sequenceNum = msg.s;
  websocket.emit('raw', msg.d);
  switch (msg.t) {
    case 'READY': {
      websocket.emit('debug', `${green.bold('[NOTICE/Websocket]')} ${green('Connected to the Discord API')}`);
      websocket.user = msg.d.user;
      websocket._sessionId = msg.d.session_id;
      return websocket.emit('ready', msg.d.user);
    }
    break;
    case 'MESSAGE_CREATE': {
      return websocket.emit('message', new Message(msg.d, websocket));
    }
    break;
    case 'GUILD_CREATE': case 'GUILD_UPDATE': {
      if (!websocket.cache.guilds) return;
      return websocket.cache.guilds.set(msg.d.id, msg.d);
    }
    break;
    case 'GUILD_DELETE': {
      if (!websocket.cache.guilds) return;
      return websocket.cache.guilds.delete(msg.d.id);
    }
    break;
  }

  switch (msg.op) {
    case 7: {
      return websocket.socket.send(JSON.stringify({
        op: 6,
        d: {
          session_id: websocket._sessionId,
          token: websocket.token,
          seq: websocket._sequenceNum
        }
      }));
    }
    break;
    case 10: {
      if (websocket.hb) clearInterval(websocket.hb);
      websocket.hb = setInterval(() => {
         websocket.socket.send(JSON.stringify({ op: 1, d: websocket._sequenceNum }));
         return websocket.emit('debug', `[Heartbeat] - ${msg.d.heartbeat_interval}ms`);
      }, msg.d.heartbeat_interval);
      return websocket.emit('debug', `${bold('[NOTICE/Websocket]')} - Starting heartbeat at ${msg.d.heartbeat_interval}ms`);
    }
    break;
  }
}
