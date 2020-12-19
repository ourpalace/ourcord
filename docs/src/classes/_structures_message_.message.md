# Class: Message

## Hierarchy

* **Message**

## Index

### Constructors

* [constructor](_structures_message_.message.md#constructor)

### Properties

* [attachments](_structures_message_.message.md#attachments)
* [author](_structures_message_.message.md#author)
* [channel](_structures_message_.message.md#channel)
* [channel\_type](_structures_message_.message.md#channel_type)
* [content](_structures_message_.message.md#content)
* [embeds](_structures_message_.message.md#embeds)
* [guild](_structures_message_.message.md#guild)
* [id](_structures_message_.message.md#id)
* [member](_structures_message_.message.md#member)
* [mentions](_structures_message_.message.md#mentions)
* [pinned](_structures_message_.message.md#pinned)
* [reactions](_structures_message_.message.md#reactions)
* [replyTo](_structures_message_.message.md#replyto)
* [stickers](_structures_message_.message.md#stickers)
* [timestamp](_structures_message_.message.md#timestamp)
* [tts](_structures_message_.message.md#tts)
* [type](_structures_message_.message.md#type)

## Constructors

### constructor

\+ **new Message**(`data`: [MessageRaw](_structures_messageraw_.messageraw.md), `client`: [Client](_websocket_.client.md)): [Message](_structures_message_.message.md)

*Defined in src/structures/Message.ts:24*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [MessageRaw](_structures_messageraw_.messageraw.md) | the raw message |
`client` | [Client](_websocket_.client.md) | the client  |

**Returns:** [Message](_structures_message_.message.md)

## Properties

### attachments

•  **attachments**: object

*Defined in src/structures/Message.ts:18*

___

### author

•  **author**: object

*Defined in src/structures/Message.ts:12*

___

### channel

•  **channel**: [Channel](_structures_channel_.channel.md)

*Defined in src/structures/Message.ts:9*

___

### channel\_type

•  **channel\_type**: number

*Defined in src/structures/Message.ts:10*

___

### content

•  **content**: string \| object

*Defined in src/structures/Message.ts:14*

___

### embeds

•  **embeds**: object

*Defined in src/structures/Message.ts:19*

___

### guild

•  **guild**: object

*Defined in src/structures/Message.ts:11*

___

### id

•  **id**: string

*Defined in src/structures/Message.ts:8*

___

### member

•  **member**: object

*Defined in src/structures/Message.ts:13*

___

### mentions

•  **mentions**: object

*Defined in src/structures/Message.ts:17*

___

### pinned

•  **pinned**: boolean

*Defined in src/structures/Message.ts:21*

___

### reactions

•  **reactions**: object

*Defined in src/structures/Message.ts:20*

___

### replyTo

•  **replyTo**: object

*Defined in src/structures/Message.ts:24*

___

### stickers

•  **stickers**: object

*Defined in src/structures/Message.ts:23*

___

### timestamp

•  **timestamp**: number

*Defined in src/structures/Message.ts:15*

___

### tts

•  **tts**: boolean

*Defined in src/structures/Message.ts:16*

___

### type

•  **type**: string

*Defined in src/structures/Message.ts:22*
