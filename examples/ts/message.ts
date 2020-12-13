import Client from "ourcord";

const client = new Client(/* Your client token here */);
client.connect();

client.on("message", (msg) => {
    if (msg.author.bot || !msg.content.startsWith()) return;     // the author is a bot user; the bot could respond to it's own messages

});