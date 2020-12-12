import { EventEmitter } from "events";

export default function handleErr(err: string, emitter: EventEmitter): boolean {
    return emitter.emit("error", err)
}
