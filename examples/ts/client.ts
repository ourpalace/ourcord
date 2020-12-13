import Client from 'ourcord';

const client = new Client('Your token here', {
  prefix: '!',
}); // client options here
client.connect();

client.on('ready', () => {
  console.log('Client ready');
});
