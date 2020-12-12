import Client, { messageProperties } from "./websocket";

const client = new Client(process.env.TOKEN);

client.connect();

client.on("ready", () => {
    console.log("Client connected to discord API");
});

client.on("debug", log => {
    console.log(log);
});

client.on("message", async (msg: any) => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith("stupid")) return;
    const opts = {title: "poo"}
    console.log(await client.MessageEmbed(msg.channel_id, {embed:opts}));
    console.log(msg);
});
