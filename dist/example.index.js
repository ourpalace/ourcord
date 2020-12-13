"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_1 = __importDefault(require("./websocket"));
const client = new websocket_1.default(process.env.TOKEN, { status: 'dnd' });
client.connect();
client.on('ready', () => {
    console.log('Client connected to discord API');
});
client.on('debug', (log) => {
    console.log(log);
});
client.on('message', async (msg) => {
    if (msg.author.bot)
        return;
    if (!msg.content.startsWith('stupid'))
        return;
    const p = await client.createChannel(msg.guild_id, 'test');
    await client.sendMessage(p.id, 'Hi!');
    console.log(p);
});
