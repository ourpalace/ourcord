**[ourcord](README.md)**

> [Globals](globals.md)

# ✨ ourcord ✨

## About  

Ourcord is a new and alternative discord library for js that focuses on speed and simplicity while retaining low level functions of the discord API     
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

## Client Config  <a href="src/websocket.ts#L33"></></a>

| Option             | Type      | Default     | Description                                                   | Optional? |
| ------------------ | --------- | ----------- | ------------------------------------------------------------- | --------- |
| browser            | `string`  | ourcord     | Specify the browser you want to connect via (can be anything) | `yes`     |
| device             | `string`  | ourcord     | The device you want to connect with (can be anything)         | `yes`     |
| prefix             | `string`  | `null`      | Specify the prefix for the bot                                | `yes`     |
| cacheChannels      | `boolean` | `false`     | Whether or not to cache channels                              | `yes`     |
| cacheGuilds        | `boolean` | `false`     | Whether or not to cache guilds                                | `yes`     |
| cacheUsers         | `boolean` | `false`     | Whether or not to cache users                                 | `yes`     |
| cacheMembers       | `boolean` | `false`     | Whether or not to cache guild members                         | `yes`     |
| activity           | `object`  | No activity | The activity you want to appear on your client on connect     | `yes`     |
| status             | `string`  | dnd         | The status you want your client to connect with               | `yes`     |
| defaultImageFormat | `string`  | `null`      | Default image extension to display.                           | `yes`     |
| defaultImageSize   | `number`  | `null`      | Default image size to display.                                | `yes`     |

## Links

[__Discord server__](https://discord.gg/3yDQKDXXdk)  
[__Examples__](https://github.com/ourcord/examples)  

---

## Collaborators

> [**Dice**](https://github.com/alebot-dev)  

> [**Matthew**](https://github.com/matthewthechickenman)  

> [**Misly**](https://github.com/Misly16)  

> [**Starman**](https://github.com/Starman3787)

> [**Voltrex Master**](https://github.com/VoltrexMaster)

> [**null**](https://github.com/vierofernando)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://animalbot.xyz "><img src="https://avatars2.githubusercontent.com/u/65732060?v=4" width="100px;" alt=""/><br /><sub><b>matthewthechickenman</b></sub></a><br /><a href="#ideas-matthewthechickenman" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ourcord/ourcord/commits?author=matthewthechickenman" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/VoltrexMaster"><img src="https://avatars1.githubusercontent.com/u/62040526?v=4" width="100px;" alt=""/><br /><sub><b>VoltrexMaster</b></sub></a><br /><a href="https://github.com/ourcord/ourcord/commits?author=VoltrexMaster" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/alebot-dev"><img src="https://avatars2.githubusercontent.com/u/65502847?v=4" width="100px;" alt=""/><br /><sub><b>alebot-dev</b></sub></a><br /><a href="https://github.com/ourcord/ourcord/commits?author=alebot-dev" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Starman3787"><img src="https://avatars2.githubusercontent.com/u/30315137?v=4" width="100px;" alt=""/><br /><sub><b>Starman3787</b></sub></a><br /><a href="https://github.com/ourcord/ourcord/commits?author=Starman3787" title="Code">💻</a></td>
    <td align="center"><a href="http://misly.dev"><img src="https://avatars0.githubusercontent.com/u/60405462?v=4" width="100px;" alt=""/><br /><sub><b>Misly</b></sub></a><br /><a href="https://github.com/ourcord/ourcord/commits?author=Misly16" title="Code">💻</a> <a href="#design-Misly16" title="Design">🎨</a></td>
    <td align="center"><a href="https://discord.gg/HhAPkD8"><img src="https://avatars2.githubusercontent.com/u/60427892?v=4" width="100px;" alt=""/><br /><sub><b>null</b></sub></a><br /><a href="https://github.com/ourcord/ourcord/commits?author=vierofernando" title="Documentation">📖</a> <a href="https://github.com/ourcord/ourcord/commits?author=vierofernando" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
