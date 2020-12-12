import Client from "./websocket";

const client = new Client(process.env.TOKEN);

client.on("ready", () => {
    console.log("Client connected to discord API");
});

client.on("debug", debug => {
    console.log(debug);
});

client.on("message", async (msg: any) => {
    const tested = await client.sendMessage(msg.channel_id, "yes");
    console.log(tested);
});
