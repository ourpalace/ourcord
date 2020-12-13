import Client from './websocket';
const client = new Client(process.env.TOKEN, {status: 'dnd'});
client.connect();

client.on('ready', () => {
  console.log('Client connected to discord API');
});

client.on('debug', (log) => {
  console.log(log);
});

client.on('message', async (msg: any) => {
  if (msg.author.bot) return;
  if (msg.content == 'stupid status') {
    client.setStatus('online');
  }
});
