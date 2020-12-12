import { EventEmitter } from "events";

export default function handleErr(err: string, emitter: EventEmitter): void {
    emitter.emit("error", err)
}
