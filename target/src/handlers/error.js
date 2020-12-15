"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleErr(err, emitter) {
    return emitter.emit("error", err);
}
exports.default = handleErr;
