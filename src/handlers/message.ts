export default function handleMessage(message: string, flag: any, websocket: any) {
    const msg = websocket.evaluate(message, flag);
    if (msg.t === "READY") {
        return websocket.emit("ready", msg.d.user);
    } else if (msg.t === "MESSAGE_CREATE") {
        return websocket.emit("message", msg.d);
    }
}