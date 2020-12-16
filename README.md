# ✨ ourcord ✨

## About

Ourcord is a new and alternative discord library for js that focuses on speed and simplicity while retaining low level functions of the discord API

[![npm](https://img.shields.io/npm/v/ourcord?color=red&style=for-the-badge)](https://npmjs.com/package/ourcord)
[![npm](https://img.shields.io/bundlephobia/min/ourcord?color=red&style=for-the-badge)](https://npmjs.com/package/ourcord)
[![npm](https://img.shields.io/npm/dm/ourcord?color=red&style=for-the-badge)](https://npmjs.com/package/ourcord)
[![npm](https://img.shields.io/github/contributors/ourcord/ourcord?color=red&style=for-the-badge)](https://npmjs.com/package/ourcord)

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Links](#links)

## Installation

```cmd
npm i ourcord
```

That's it for installation 🎈

## Usage

```js
const { Client } = require("ourcord");
const client = new Client("your bot token here");
client.connect();

client.on("ready", () => {
  console.log("Client connected!");
});
```

---

## Client Config <a href="src/websocket.ts#L33"></></a>

| Option        | Type      | Default     | Description                                                   | Optional? |
| ------------- | --------- | ----------- | ------------------------------------------------------------- | --------- |
| browser       | `string`  | ourcord     | Specify the browser you want to connect via (can be anything) | `yes`     |
| device        | `string`  | ourcord     | The device you want to connect with (can be anything)         | `yes`     |
| prefix        | `string`  | `Null`      | Specify the prefix for the bot                                | `yes`     |
| cacheChannels | `boolean` | `false`     | Whether or not to cache channels                              | `yes`     |
| cacheGuilds   | `boolean` | `false`     | Whether or not to cache guilds                                | `yes`     |
| cacheUsers    | `boolean` | `false`     | Whether or not to cache users                                 | `yes`     |
| cacheMembers  | `boolean` | `false`     | Whether or not to cache guild members                         | `yes`     |
| activity      | `object`  | No activity | The activity you want to appear on your client on connect     | `yes`     |
| status        | `string`  | dnd         | The status you want your client to connect with               | `yes`     |

## Links

[**Discord server**](https://discord.gg/3yDQKDXXdk)  
[**Examples**](https://github.com/ourcord/examples)

---

## Collaborators

> [**Dice**](https://github.com/alebot-dev)

> [**Matthew**](https://github.com/matthewthechickenman)

> [**Misly**](https://github.com/Misly16)

> [**Starman**](https://github.com/Starman3787)

> [**Voltrex Master**](https://github.com/VoltrexMaster)

> [**null**](https://github.com/vierofernando)
