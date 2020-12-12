export default function handleMessage(message: string, flag: any, websocket: any) {
    const msg = websocket.evalutate(message, flag);
    if (msg.t === "READY") {
        websocket.emit("ready", msg.d.user);
    } else if (msg.t === "MESSAGE_CREATE") {
        websocket.emit("message", msg.d);
    }
}