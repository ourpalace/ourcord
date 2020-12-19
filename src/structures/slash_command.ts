/* eslint-disable */
import * as utils from "../utils";
import fetch from "node-fetch";
import Client from "../websocket";
import { red, bold } from "chalk";

export interface OptionsProps {
  name: string;
  description: string;
  typeID:
  | "SUB_COMMAND"
  | "SUB_COMMAND_GROUP"
  | "STRING"
  | "INTEGER"
  | "BOOLEAN"
  | "USER"
  | "CHANNEL"
  | "ROLE";
  type?: number;
  required?: boolean;
  choices?: Array<{ name: string; value: string }>;
  default?: boolean;
}

export interface SlashConfig {
  name: string;
  description: string;
  options: Array<OptionsProps>;
};

const CommandTypes = {
  SUB_COMMAND: 1,
  SUB_COMMAND_GROUP: 2,
  STRING: 3,
  INTEGER: 4,
  BOOLEAN: 5,
  USER: 6,
  CHANNEL: 7,
  ROLE: 8
} as const;

export default class SlashCommand {
  constructor(client: Client, config: SlashConfig) {
    const h = CommandTypes["SUB_COMMAND"]
    const postUrl = utils.v8BaseURl + `/applications/${client.user.id}/commands`;
    if (/ /g.test(config.name) || config.options.some(opt => / /g.test(opt.name))) {
      throw new Error(`${bold.red("[ERROR/DISCORDAPI Error]")} ${red("Slash command names can't have spaces")}`);
    } else if (!config) {
      throw new Error(`${bold.red("[ERROR/DISCORDAPI Error]")} ${red("You need to pass in a config argument")}`);
    } else if (!config.options || !config.name || !config.description) {
      throw new Error(`${bold.red("[ERROR/DISCORDAPI Error]")} ${red("Missing argument")}`);
    } else if (!config.options.every(conf => typeof conf.name !==  "undefined") || !config.options.every(conf => typeof conf.description !== "undefined") || !config.options.every(conf => typeof conf.typeID !== "undefined")) {
      throw new Error(`${bold.red("[ERROR/DISCORDAPI Error]")} ${red("Missing argument")}`);
    } else if (config.options.filter(o => o.default).length > 1) {
      throw new Error(`${bold.red("[ERROR/DISCORDAPI Error]")} ${red("There can only be one default option")}`);
    } else if (config.options.length > 10) {
      throw new Error(`${bold.red("[ERROR/DISCORDAPI Error]")} ${red("Maximum of 10 options per slash command")}`);
    } else if (!config.options.some(opt => typeof opt.typeID !== "number") && !config.options.some(opt => CommandTypes[opt.typeID])) {
      throw new Error(`${bold.red("[ERROR/DISCORDAPI Error]")} ${red("Invalid command option type")}`)
    }
    getSlash(client, postUrl, config);
  }
}

async function getSlash(client: Client, postUrl: string, config: SlashConfig): Promise<SlashCommand> {
  config.options.forEach(opt => opt.type = CommandTypes[opt.typeID])
  const body = JSON.stringify(config)
  let res = await fetch(postUrl, {
    method: "POST",
    headers: {
      'Authorization': `Bot ${client.token}`,
      'Content-Type': 'application/json'
    },
    body: body
  });
  return res.json();
}

