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

*Defined in src/structures/Message.ts:20*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [MessageRaw](_structures_messageraw_.messageraw.md) | the raw message |
`client` | [Client](_websocket_.client.md) | the client  |

**Returns:** [Message](_structures_message_.message.md)

## Properties

### attachments

•  **attachments**: object

*Defined in src/structures/Message.ts:14*

___

### author

•  **author**: object

*Defined in src/structures/Message.ts:8*

___

### channel

•  **channel**: object

*Defined in src/structures/Message.ts:6*

___

### content

•  **content**: string \| object

*Defined in src/structures/Message.ts:10*

___

### embeds

•  **embeds**: object

*Defined in src/structures/Message.ts:15*

___

### guild

•  **guild**: object

*Defined in src/structures/Message.ts:7*

___

### id

•  **id**: string

*Defined in src/structures/Message.ts:5*

___

### member

•  **member**: object

*Defined in src/structures/Message.ts:9*

___

### mentions

•  **mentions**: object

*Defined in src/structures/Message.ts:13*

___

### pinned

•  **pinned**: boolean

*Defined in src/structures/Message.ts:17*

___

### reactions

•  **reactions**: object

*Defined in src/structures/Message.ts:16*

___

### replyTo

•  **replyTo**: object

*Defined in src/structures/Message.ts:20*

___

### stickers

•  **stickers**: object

*Defined in src/structures/Message.ts:19*

___

### timestamp

•  **timestamp**: number

*Defined in src/structures/Message.ts:11*

___

### tts

•  **tts**: boolean

*Defined in src/structures/Message.ts:12*

___

### type

•  **type**: string

*Defined in src/structures/Message.ts:18*
