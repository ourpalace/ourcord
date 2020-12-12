import { green, bold } from "chalk";

export default function handleMessage(message: string, flag: any, websocket: any) {
    const msg = websocket.evaluate(message, flag);
    if (msg.t === "READY") {
        websocket.emit("debug", `${green.bold("[NOTICE/websocket]")} ${green("Connected to the Discord API")}}`)
        return websocket.emit("ready", msg.d.user);
    } else if (msg.t === "MESSAGE_CREATE") {
        return websocket.emit("message", msg.d);
    } else if (msg.op == 10) {
        return websocket.emit("debug", `${bold("[NOTICE/websocket]")} You'll need to ack the packet ${JSON.stringify(msg.d)}`);
    }
}