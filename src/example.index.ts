import Client from "./websocket";

const client = new Client(process.env.TOKEN, {status: "dnd"});

client.connect();

client.on("ready", () => {
    console.log("Client connected to discord API");
    setTimeout(() => {
        client.setStatus('online');
    }, 30000)
});

client.on("debug", log => {
    console.log(log);
});

client.on("message", async (msg: any) => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith("stupid")) return;
    const opts = {title: "poo"}
    await client.MessageEmbed(msg.channel_id, {embed:opts});
});
