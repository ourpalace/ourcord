import * as utils from '../utils';
import fetch from 'node-fetch';
import Client from '../websocket';
import { red, bold } from 'chalk';

declare interface Choice {
   name: string;
   value: string;
}

export interface OptionsProps {
  name: string;
  description: string;
  typeID: 'SUB_COMMAND' | 'SUB_COMMAND_GROUP' | 'STRING' | 'INTEGER' | 'BOOLEAN' | 'USER' | 'CHANNEL' | 'ROLE';
  type?: number;
  required?: boolean;
  choices?: Choice[];
  default?: boolean;
}

export interface SlashConfig {
  name: string;
  description: string;
  options: OptionsProps[];
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
    const h = CommandTypes['SUB_COMMAND'];
    const postUrl = `${utils.v8BaseURl}/applications/${client.user.id}/commands`;
    if (!config) throw new Error(`${bold.red('[ERROR/DiscordAPIError]')} ${red('\'config\' argument is required')}`);
    if (typeof config.name !== 'string') throw new Error(`${bold.red('[ERROR/DiscordAPIError]')} ${red('\'config.name\' must be a string')}`);
    if (typeof config.description !== 'string') throw new Error(`${bold.red('[ERROR/DiscordAPIError]')} ${red('\'config.description\' must be a string')}`);
    if (!Array.isArray(config.options)) throw new Error(`${bold.red('[ERROR/DiscordAPIError]')} ${red('\'config.options\' must be an array')}`);
    if (config.options.length > 10) throw new Error(`${bold.red('[ERROR/DiscordAPIError]')} ${red('Cannot have more than 10 options in \'config.options\'')}`);
    if (config.options.filter(option => option.default).length > 1) throw new Error(`${bold.red('[ERROR/DiscordAPIError]')} ${red('There can only be 1 default command option')}`);
    let properties = ['typeID', 'name', 'description'];
    if (!properties.slice(1).some(property => property in config) || !properties.some(property => config.options.every(c => typeof c[property] !== 'undefined'))) throw new Error(`${bold.red('[ERROR/DiscordAPIError]')} ${red('Missing arguments in \'config\'')}`);
    if (!config.options.some(({ typeID }) => typeof typeID === 'number') || !config.options.some(({ typeID }) => CommandTypes[typeID])) throw new Error(`${bold.red('[ERROR/DiscordAPIError]')} ${red('Invalid command option type')}`);
    if (config.name.includes(' ') || config.options.some(({ name }) => name.includes(' '))) throw new Error(`${bold.red('[ERROR/DiscordAPIError]')} ${red('Command option name cannot include spaces')}`);
    return getSlash(client, postUrl, config);
  }
}

async function getSlash(client: Client, postUrl: string, config: SlashConfig): Promise<SlashCommand> {
  for (let option of config.options) option.type = CommandTypes[option.typeID];
  return await fetch(postUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bot ${client.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(config)
  }).then(res => res.json());
}
