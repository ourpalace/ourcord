import Client from "./websocket";

const client = new Client(/* YOUR TOKEN HERE */);

client.on("ready", () => {
    console.log("Client connected to discord API");
});

client.on("message", async msg => {
    const tested = await client.sendMessage(msg.channel_id, "yes");
    console.log(tested);
});
