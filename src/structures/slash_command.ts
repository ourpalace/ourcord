/* eslint-disable */
import * as utils from "../utils";
import fetch from "node-fetch";
import Client from "../websocket";
import { red, bold } from "chalk";

export interface OptionsProps {
  name: string;
  description: string;
  type:
    | number
    | "SUB_COMMAND"
    | "SUB_COMMAND_GROUP"
    | "STRING"
    | "INTEGER"
    | "BOOLEAN"
    | "USER"
    | "CHANNEL"
    | "ROLE";
  required: boolean;
  choices: Array<{ name: string; value: string }>;
}

export interface SlashConfig {
  name: string;
  description: string;
  options: Array<OptionsProps>;
}

export default class SlashCommand {
  constructor(client: Client, config: SlashConfig) {
    const postUrl = utils.v8BaseURl + `/applications/${client.user.id}/commands`;
    if (/ /g.test(config.name) || config.options.some(opt => / /g.test(opt.name))) {
      throw new Error(`${bold.red("[ERROR/DISCORDAPI Error]")} ${red("Slash command names can't have spaces")}`);
    }
    getSlash(client, postUrl, config);
  }
}

async function getSlash(client: Client, postUrl: string, config: SlashConfig): Promise<SlashCommand> {
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

