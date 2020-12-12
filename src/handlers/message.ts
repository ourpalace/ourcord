export default function handleMessage(message: string, flag: any, websocket: any) {
    const msg = websocket.evaluate(message, flag);
    if (msg.t === "READY") {
        return websocket.emit("ready", msg.d.user);
    } else if (msg.t === "MESSAGE_CREATE") {
        return websocket.emit("message", msg.d);
    } else if (msg.op == 10) {
        if (websocket.hb) clearInterval(websocket.hb)
        websocket.hb = setInterval(() => {
            websocket.emit('debug', `[Heartbeat] - ${msg.d.heartbeat_interval}ms`)
        }, msg.d.heartbeat_interval)
        return console.log(`You'll need to ack the packet ${JSON.stringify(msg.d)}`)
    }
}