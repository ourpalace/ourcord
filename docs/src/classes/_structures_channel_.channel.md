# Class: Channel

## Hierarchy

* **Channel**

## Index

### Constructors

* [constructor](_structures_channel_.channel.md#constructor)

### Properties

* [application\_id](_structures_channel_.channel.md#application_id)
* [bitrate](_structures_channel_.channel.md#bitrate)
* [icon](_structures_channel_.channel.md#icon)
* [id](_structures_channel_.channel.md#id)
* [last\_message\_id](_structures_channel_.channel.md#last_message_id)
* [last\_pin\_timestamp](_structures_channel_.channel.md#last_pin_timestamp)
* [name](_structures_channel_.channel.md#name)
* [nsfw](_structures_channel_.channel.md#nsfw)
* [owner\_id](_structures_channel_.channel.md#owner_id)
* [parent\_id](_structures_channel_.channel.md#parent_id)
* [permission\_overwrites](_structures_channel_.channel.md#permission_overwrites)
* [position](_structures_channel_.channel.md#position)
* [rate\_limit\_per\_user](_structures_channel_.channel.md#rate_limit_per_user)
* [recipients](_structures_channel_.channel.md#recipients)
* [send](_structures_channel_.channel.md#send)
* [topic](_structures_channel_.channel.md#topic)
* [type](_structures_channel_.channel.md#type)
* [user\_limit](_structures_channel_.channel.md#user_limit)

## Constructors

### constructor

\+ **new Channel**(): [Channel](_structures_channel_.channel.md)

*Defined in [src/structures/channel.ts:25](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L25)*

**Returns:** [Channel](_structures_channel_.channel.md)

## Properties

### application\_id

• `Optional` `Readonly` **application\_id**: string

*Defined in [src/structures/channel.ts:22](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L22)*

___

### bitrate

• `Optional` `Readonly` **bitrate**: number

*Defined in [src/structures/channel.ts:16](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L16)*

___

### icon

• `Optional` `Readonly` **icon**: string

*Defined in [src/structures/channel.ts:20](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L20)*

___

### id

• `Readonly` **id**: string

*Defined in [src/structures/channel.ts:8](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L8)*

___

### last\_message\_id

• `Optional` `Readonly` **last\_message\_id**: string

*Defined in [src/structures/channel.ts:15](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L15)*

___

### last\_pin\_timestamp

• `Optional` `Readonly` **last\_pin\_timestamp**: string

*Defined in [src/structures/channel.ts:24](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L24)*

___

### name

• `Optional` `Readonly` **name**: string

*Defined in [src/structures/channel.ts:12](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L12)*

___

### nsfw

• `Optional` `Readonly` **nsfw**: boolean

*Defined in [src/structures/channel.ts:14](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L14)*

___

### owner\_id

• `Optional` `Readonly` **owner\_id**: string

*Defined in [src/structures/channel.ts:21](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L21)*

___

### parent\_id

• `Optional` `Readonly` **parent\_id**: string

*Defined in [src/structures/channel.ts:23](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L23)*

___

### permission\_overwrites

• `Optional` `Readonly` **permission\_overwrites**: object

*Defined in [src/structures/channel.ts:11](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L11)*

___

### position

• `Optional` `Readonly` **position**: number

*Defined in [src/structures/channel.ts:10](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L10)*

___

### rate\_limit\_per\_user

• `Optional` `Readonly` **rate\_limit\_per\_user**: number

*Defined in [src/structures/channel.ts:18](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L18)*

___

### recipients

• `Optional` `Readonly` **recipients**: object

*Defined in [src/structures/channel.ts:19](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L19)*

___

### send

•  **send**: (content: string) => Promise<[Message](_structures_message_.message.md)\>

*Defined in [src/structures/channel.ts:25](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L25)*

___

### topic

• `Optional` `Readonly` **topic**: string

*Defined in [src/structures/channel.ts:13](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L13)*

___

### type

• `Readonly` **type**: number

*Defined in [src/structures/channel.ts:9](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L9)*

___

### user\_limit

• `Optional` `Readonly` **user\_limit**: number

*Defined in [src/structures/channel.ts:17](https://github.com/ourcord/ourcord/blob/175a597/src/structures/channel.ts#L17)*
