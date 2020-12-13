# ✨ ourcord ✨

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)

## About  

Ourcord is a new and alternative discord library for js that focuses on speed and simplicity while retaining low level functions of the discord API  

## Installation  

```cmd
npm i ourcord
```

That's it for installation 🎈

## Usage  

```js
const Client = require("ourcord");
const client = new Client("your bot token here");
client.connect();

client.on("ready", () => {
    console.log("Client connected!");
});
```  

---  

## Client Config  <a href="src/websocket.ts#L33"></></a>

| Option | Type | Default | Description | Optional? |
| --- | --- | --- | --- | --- |
| browser | `string` | ourcord | Specify the browser you want to connect via (can be anything) | `yes`
| device | `string` | ourcord | The device you want to connect with (can be anything) | `yes`
| prefix | `string` | `Null` | The device you want to connect with (can be anything) | `yes`
| activity | `object` | No activity | The activity you want to appear on your client on connect | `yes`
| status | `string` | dnd | The status you want your client to connect with | `yes`
