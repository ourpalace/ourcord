import { yellow, bold } from "chalk";
import handlers from "./handlers/handlers.index";
import Client from "./websocket";
import ws from "ws";

export function connect() {
    Client.emit("debug", `${yellow.bold("[NOTICE/websocket]")} ${yellow("Attempting to connect to the discord gateway")}`)
    Client.socket = new ws("wss://gateway.discord.gg/?v=6&encoding=json");
    Client.socket.once("open", () => {
        Client.emit("debug", `${yellow.bold("[NOTICE/websocket]")} ${yellow("Attempting to login")}`);
        const data = JSON.stringify(Client.getMetaData());
        Client.socket.send(data);
        Client.socket.once("error", (error: string) => {
            handlers.errorHandler(error, Client);
        });
        Client.socket.on("message", (message: any, flag: any) => {
            handlers.messageHandler(message, flag, Client)
        });
        Client.socket.on("close", () => {
            Client.emit("debug", `${bold("[NOTICE/websocket]")} Connection closed unexpectedly. Re-attempting login`);
            Client.connect(Client);
        });
    });
};
