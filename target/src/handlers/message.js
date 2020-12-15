"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const Message_1 = require("../structures/Message");
function handleMessage(message, flag, websocket) {
    const msg = websocket.evaluate(message, flag);
    websocket._sequenceNum = msg.s;
    if (msg.t === "READY") {
        websocket.emit("debug", `${chalk_1.green.bold("[NOTICE/websocket]")} ${chalk_1.green("Connected to the Discord API")}`);
        websocket._sessionId = msg.d.session_id;
        return websocket.emit("ready", msg.d.user);
    }
    else if (msg.t === "MESSAGE_CREATE") {
        return websocket.emit("message", new Message_1.Message(msg.d, websocket));
    }
    else if (msg.op == 10) {
        if (websocket.hb)
            clearInterval(websocket.hb);
        websocket.hb = setInterval(() => {
            websocket.socket.send(JSON.stringify({ op: 1, d: websocket._sequenceNum }));
            websocket.emit('debug', `[Heartbeat] - ${msg.d.heartbeat_interval}ms`);
        }, msg.d.heartbeat_interval);
        return websocket.emit("debug", `${chalk_1.bold("[NOTICE/websocket]")} - Starting heartbeat at ${msg.d.heartbeat_interval}ms`);
    }
    else if (msg.op == 7) {
        websocket.socket.send(JSON.stringify({
            op: 6,
            d: {
                session_id: websocket._sessionId,
                token: websocket.token,
                seq: websocket._sequenceNum
            }
        }));
    }
}
exports.default = handleMessage;
