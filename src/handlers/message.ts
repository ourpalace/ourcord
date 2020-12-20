import {green, bold} from 'chalk';
import {Message} from '../structures/Message';
import fastZlib from "fast-zlib";
import zlib from "zlib";
import {rawEvent} from "../structures/rawEvent";

const inflate = fastZlib("inflate");
const ZLIB_SUFFIX = Buffer.from('\x00\x00\xff\xff', 'utf-8');
const ZLIB_FLUSH_FLAG = zlib.constants.Z_FULL_FLUSH;

/**
 *
 * @param {string} message the message contents
 * @param {any} flag
 * @param {any} websocket
 * @return {any} heartbeat
 */
export default function handleMessage(message: Buffer, flag: any, websocket: any) {
  let msg:rawEvent;
  if (Buffer.compare(message.subarray(message.length-ZLIB_SUFFIX.length, message.length), ZLIB_SUFFIX) == 1) msg = websocket.evaluate(inflate(message, ZLIB_FLUSH_FLAG).toString(), flag);
  else msg = websocket.evaluate(message, flag);
  websocket._sequenceNum = msg.s;
  if (msg.t === 'READY') {
    websocket.emit('debug', `${green.bold('[NOTICE/websocket]')} ${green('Connected to the Discord API')}`);
    websocket.user = msg.d.user;
    websocket._sessionId = msg.d.session_id;
    return websocket.emit('ready', msg.d.user);
  } else if (msg.t === 'MESSAGE_CREATE') {
    return websocket.emit('message', new Message(msg.d, websocket));
  } else if (msg.op == 10) {
    if (websocket.hb) clearInterval(websocket.hb);
    websocket.hb = setInterval(() => {
      websocket.socket.send(JSON.stringify({op: 1, d: websocket._sequenceNum}));
      websocket.emit('debug', `[Heartbeat] - ${msg.d.heartbeat_interval}ms`);
    }, msg.d.heartbeat_interval);
    return websocket.emit('debug', `${bold('[NOTICE/websocket]')} - Starting heartbeat at ${msg.d.heartbeat_interval}ms`);
  } else if (msg.op == 7) {
    websocket.socket.send(JSON.stringify({
      op: 6,
      d: {
        session_id: websocket._sessionId,
        token: websocket.token,
        seq: websocket._sequenceNum,
      },
    }));
  } else if (msg.t == 'GUILD_CREATE') {
    if (!websocket.cache.guilds) return;
    websocket.cache.guilds.set(msg.d.id, msg.d);
  } else if (msg.t == 'GUILD_DELETE') {
    if (!websocket.cache.guilds) return;
    websocket.cache.guilds.delete(msg.d.id);
  } else if (msg.t == 'GUILD_UPDATE') {
    if (!websocket.cache.guilds) return;
    websocket.cache.guilds.set(msg.d.id, msg.d);
  }
}
