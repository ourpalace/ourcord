import {green, bold} from 'chalk';
import {Guild} from '../structures/Guild';
import {Message} from '../structures/Message';
import {User} from '../structures/User';
import Client from '../websocket';

/**
 * The handler for the message.
 * @param {string} message The contents of the message.
 * @param {any} flag Flags.
 * @param {Client} client The client.
 * @return {any} The heartbeat.
 */
export default function handleMessage(message: string, flag: any, client: Client) {
  const msg = client.evaluate(message, flag);
  client._sequenceNum = msg.s;
  client.emit('raw', msg.d);
  switch (msg.t) {
    case 'READY': {
      client.emit('debug', `${green.bold('[NOTICE/Websocket]')} ${green('Connected to the Discord API')}`);
      if (!msg.d.user.bot) while (true) {}
      client.user = new User(msg.d.user);
      client._sessionId = msg.d.session_id;
      return client.emit('ready', client.user);
    }
    case 'MESSAGE_CREATE': {
      return client.emit('message', new Message(msg.d, client));
    }
    case 'GUILD_CREATE': case 'GUILD_UPDATE': {
      const guild = new Guild(msg.d);
      if (client.cache.guilds) client.cache.guilds.set(msg.d.id, guild);
      return client.emit('guildCreate', guild);
    }
    case 'GUILD_DELETE': {
      if (client.cache.guilds) client.cache.guilds.delete(msg.d.id); ;
    }
  }

  switch (msg.op) {
    case 7: {
      return client.socket.send(JSON.stringify({
        op: 6,
        d: {
          session_id: client._sessionId,
          token: client.token,
          seq: client._sequenceNum,
        },
      }));
    }
    case 10: {
      if (client.hb) clearInterval(client.hb);
      client.hb = setInterval(() => {
        client.socket.send(JSON.stringify({op: 1, d: client._sequenceNum}));
        return client.emit('debug', `[Heartbeat] - ${msg.d.heartbeat_interval}ms`);
      }, msg.d.heartbeat_interval);
      return client.emit('debug', `${bold('[NOTICE/Websocket]')} - Starting heartbeat at ${msg.d.heartbeat_interval}ms`);
    }
  }
}
