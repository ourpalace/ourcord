"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("./error"));
const message_1 = __importDefault(require("./message"));
exports.default = {
    errorHandler: error_1.default,
    messageHandler: message_1.default
};
