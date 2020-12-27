# Class: Client

**`param`** The client's token used for gateway connection.

**`param`** The socket.

**`param`** The configurations.

## Hierarchy

* EventEmitter

  ↳ **Client**

## Index

### Constructors

* [constructor](_websocket_.client.md#constructor)

### Properties

* [activities](_websocket_.client.md#activities)
* [cache](_websocket_.client.md#cache)
* [config](_websocket_.client.md#config)
* [hb](_websocket_.client.md#hb)
* [security](_websocket_.client.md#security)
* [socket](_websocket_.client.md#socket)
* [token](_websocket_.client.md#token)
* [user](_websocket_.client.md#user)
* [ws](_websocket_.client.md#ws)
* [defaultMaxListeners](_websocket_.client.md#defaultmaxlisteners)
* [errorMonitor](_websocket_.client.md#errormonitor)

### Methods

* [\_GetRestUser](_websocket_.client.md#_getrestuser)
* [\_MessageEmbed](_websocket_.client.md#_messageembed)
* [\_sendMessage](_websocket_.client.md#_sendmessage)
* [addListener](_websocket_.client.md#addlistener)
* [connect](_websocket_.client.md#connect)
* [createChannel](_websocket_.client.md#createchannel)
* [destroy](_websocket_.client.md#destroy)
* [emit](_websocket_.client.md#emit)
* [evaluate](_websocket_.client.md#evaluate)
* [eventNames](_websocket_.client.md#eventnames)
* [getGlobalSlashcommands](_websocket_.client.md#getglobalslashcommands)
* [getMaxListeners](_websocket_.client.md#getmaxlisteners)
* [getMetaData](_websocket_.client.md#getmetadata)
* [listenerCount](_websocket_.client.md#listenercount)
* [listeners](_websocket_.client.md#listeners)
* [off](_websocket_.client.md#off)
* [on](_websocket_.client.md#on)
* [once](_websocket_.client.md#once)
* [prependListener](_websocket_.client.md#prependlistener)
* [prependOnceListener](_websocket_.client.md#prependoncelistener)
* [rawListeners](_websocket_.client.md#rawlisteners)
* [removeAllListeners](_websocket_.client.md#removealllisteners)
* [removeListener](_websocket_.client.md#removelistener)
* [request](_websocket_.client.md#request)
* [setMaxListeners](_websocket_.client.md#setmaxlisteners)
* [setStatus](_websocket_.client.md#setstatus)
* [listenerCount](_websocket_.client.md#listenercount)

## Constructors

### constructor

\+ **new Client**(`token`: string, `options?`: [ClientOptions](../interfaces/_websocket_.clientoptions.md)): [Client](_websocket_.client.md)

*Overrides void*

*Defined in [src/websocket.ts:88](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L88)*

The main client constructor.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`token` | string | The client's token used for gateway connection. |
`options?` | [ClientOptions](../interfaces/_websocket_.clientoptions.md) | - |

**Returns:** [Client](_websocket_.client.md)

## Properties

### activities

•  **activities**: any

*Defined in [src/websocket.ts:84](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L84)*

___

### cache

•  **cache**: any

*Defined in [src/websocket.ts:86](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L86)*

___

### config

•  **config**: [ClientOptions](../interfaces/_websocket_.clientoptions.md)

*Defined in [src/websocket.ts:85](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L85)*

___

### hb

• `Readonly` **hb**: Timeout

*Defined in [src/websocket.ts:81](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L81)*

___

### security

•  **security**: [SecurityProperties](../interfaces/_websocket_.securityproperties.md)

*Defined in [src/websocket.ts:88](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L88)*

___

### socket

•  **socket**: any

*Defined in [src/websocket.ts:83](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L83)*

___

### token

• `Readonly` **token**: string

*Defined in [src/websocket.ts:80](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L80)*

___

### user

• `Readonly` **user**: [User](_structures_user_.user.md)

*Defined in [src/websocket.ts:82](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L82)*

___

### ws

•  **ws**: [WSProperties](../modules/_websocket_.md#wsproperties)

*Defined in [src/websocket.ts:87](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L87)*

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: number

*Inherited from [Client](_websocket_.client.md).[defaultMaxListeners](_websocket_.client.md#defaultmaxlisteners)*

*Defined in node_modules/@types/node/events.d.ts:45*

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: unique symbol

*Inherited from [Client](_websocket_.client.md).[errorMonitor](_websocket_.client.md#errormonitor)*

*Defined in node_modules/@types/node/events.d.ts:55*

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

## Methods

### \_GetRestUser

▸ **_GetRestUser**(`userID`: string): Promise<[User](_structures_user_.user.md)\>

*Defined in [src/websocket.ts:229](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L229)*

The method used to fetch a user from the rest discord API.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`userID` | string | The ID of the user to fetch. |

**Returns:** Promise<[User](_structures_user_.user.md)\>

___

### \_MessageEmbed

▸ **_MessageEmbed**(`channel`: string, `options`: [EmbedProperties](../interfaces/_websocket_.embedproperties.md)): Promise<any\>

*Defined in [src/websocket.ts:219](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L219)*

The method used to send an embed in a TextChannel.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`channel` | string | ID of the TextChannel the embed will be sent in. |
`options` | [EmbedProperties](../interfaces/_websocket_.embedproperties.md) | The embed data. |

**Returns:** Promise<any\>

___

### \_sendMessage

▸ **_sendMessage**(`channel`: string, `content`: string \| object): Promise<[MessageRaw](_structures_messageraw_.messageraw.md)\>

*Defined in [src/websocket.ts:199](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L199)*

The method used to send a message to a TextChannel.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`channel` | string | ID of the TextChannel the message will be sent in. |
`content` | string \| object | The body of the message. |

**Returns:** Promise<[MessageRaw](_structures_messageraw_.messageraw.md)\>

___

### addListener

▸ **addListener**(`event`: string \| symbol, `listener`: (...args: any[]) => void): this

*Inherited from [Client](_websocket_.client.md).[addListener](_websocket_.client.md#addlistener)*

*Defined in node_modules/@types/node/events.d.ts:62*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |
`listener` | (...args: any[]) => void |

**Returns:** this

___

### connect

▸ **connect**(): void

*Defined in [src/websocket.ts:151](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L151)*

The method used to connect to the gateway.

**Returns:** void

___

### createChannel

▸ **createChannel**(`g`: string, `name`: string): Promise<any\>

*Defined in [src/websocket.ts:301](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L301)*

The method used to create a GuildChannel.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`g` | string | ID of the guild where the channel will be created in. |
`name` | string | The name of the channel. |

**Returns:** Promise<any\>

___

### destroy

▸ **destroy**(`reason?`: string): void

*Defined in [src/websocket.ts:175](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L175)*

The method used to destroy the client and close the connection to the websocket.

#### Parameters:

Name | Type |
------ | ------ |
`reason?` | string |

**Returns:** void

___

### emit

▸ **emit**(`event`: string \| symbol, ...`args`: any[]): boolean

*Inherited from [Client](_websocket_.client.md).[emit](_websocket_.client.md#emit)*

*Defined in node_modules/@types/node/events.d.ts:72*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |
`...args` | any[] |

**Returns:** boolean

___

### evaluate

▸ **evaluate**(`data`: any, `flag`: any): string

*Defined in [src/websocket.ts:263](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L263)*

Evaluates under the hood stuff.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | any | The data to evaluate. |
`flag` | any | The flags for evaluation. |

**Returns:** string

___

### eventNames

▸ **eventNames**(): Array<string \| symbol\>

*Inherited from [Client](_websocket_.client.md).[eventNames](_websocket_.client.md#eventnames)*

*Defined in node_modules/@types/node/events.d.ts:77*

**Returns:** Array<string \| symbol\>

___

### getGlobalSlashcommands

▸ **getGlobalSlashcommands**(): Promise<[SlashConfig](../interfaces/_structures_slash_command_.slashconfig.md)\>

*Defined in [src/websocket.ts:183](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L183)*

**Returns:** Promise<[SlashConfig](../interfaces/_structures_slash_command_.slashconfig.md)\>

___

### getMaxListeners

▸ **getMaxListeners**(): number

*Inherited from [Client](_websocket_.client.md).[getMaxListeners](_websocket_.client.md#getmaxlisteners)*

*Defined in node_modules/@types/node/events.d.ts:69*

**Returns:** number

___

### getMetaData

▸ **getMetaData**(): any

*Defined in [src/websocket.ts:238](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L238)*

The method used to get the metadata.

**Returns:** any

___

### listenerCount

▸ **listenerCount**(`event`: string \| symbol): number

*Inherited from [Client](_websocket_.client.md).[listenerCount](_websocket_.client.md#listenercount)*

*Defined in node_modules/@types/node/events.d.ts:73*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |

**Returns:** number

___

### listeners

▸ **listeners**(`event`: string \| symbol): Function[]

*Inherited from [Client](_websocket_.client.md).[listeners](_websocket_.client.md#listeners)*

*Defined in node_modules/@types/node/events.d.ts:70*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |

**Returns:** Function[]

___

### off

▸ **off**(`event`: string \| symbol, `listener`: (...args: any[]) => void): this

*Inherited from [Client](_websocket_.client.md).[off](_websocket_.client.md#off)*

*Defined in node_modules/@types/node/events.d.ts:66*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |
`listener` | (...args: any[]) => void |

**Returns:** this

___

### on

▸ **on**(`event`: \"ready\", `listener`: (user: [User](_structures_user_.user.md)) => void): this

*Overrides void*

*Defined in [src/websocket.ts:68](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L68)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | \"ready\" |
`listener` | (user: [User](_structures_user_.user.md)) => void |

**Returns:** this

▸ **on**(`event`: \"debug\", `listener`: (message: string) => void): this

*Overrides void*

*Defined in [src/websocket.ts:69](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L69)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | \"debug\" |
`listener` | (message: string) => void |

**Returns:** this

▸ **on**(`event`: \"message\", `listener`: (message: [Message](_structures_message_.message.md)) => void): this

*Overrides void*

*Defined in [src/websocket.ts:70](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L70)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | \"message\" |
`listener` | (message: [Message](_structures_message_.message.md)) => void |

**Returns:** this

▸ **on**(`event`: \"error\", `listener`: (error: any) => void): this

*Overrides void*

*Defined in [src/websocket.ts:71](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L71)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | \"error\" |
`listener` | (error: any) => void |

**Returns:** this

___

### once

▸ **once**(`event`: string \| symbol, `listener`: (...args: any[]) => void): this

*Inherited from [Client](_websocket_.client.md).[once](_websocket_.client.md#once)*

*Defined in node_modules/@types/node/events.d.ts:64*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |
`listener` | (...args: any[]) => void |

**Returns:** this

___

### prependListener

▸ **prependListener**(`event`: string \| symbol, `listener`: (...args: any[]) => void): this

*Inherited from [Client](_websocket_.client.md).[prependListener](_websocket_.client.md#prependlistener)*

*Defined in node_modules/@types/node/events.d.ts:75*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |
`listener` | (...args: any[]) => void |

**Returns:** this

___

### prependOnceListener

▸ **prependOnceListener**(`event`: string \| symbol, `listener`: (...args: any[]) => void): this

*Inherited from [Client](_websocket_.client.md).[prependOnceListener](_websocket_.client.md#prependoncelistener)*

*Defined in node_modules/@types/node/events.d.ts:76*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |
`listener` | (...args: any[]) => void |

**Returns:** this

___

### rawListeners

▸ **rawListeners**(`event`: string \| symbol): Function[]

*Inherited from [Client](_websocket_.client.md).[rawListeners](_websocket_.client.md#rawlisteners)*

*Defined in node_modules/@types/node/events.d.ts:71*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |

**Returns:** Function[]

___

### removeAllListeners

▸ **removeAllListeners**(`event?`: string \| symbol): this

*Inherited from [Client](_websocket_.client.md).[removeAllListeners](_websocket_.client.md#removealllisteners)*

*Defined in node_modules/@types/node/events.d.ts:67*

#### Parameters:

Name | Type |
------ | ------ |
`event?` | string \| symbol |

**Returns:** this

___

### removeListener

▸ **removeListener**(`event`: string \| symbol, `listener`: (...args: any[]) => void): this

*Inherited from [Client](_websocket_.client.md).[removeListener](_websocket_.client.md#removelistener)*

*Defined in node_modules/@types/node/events.d.ts:65*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |
`listener` | (...args: any[]) => void |

**Returns:** this

___

### request

▸ **request**(`method`: string, `path`: string, `body?`: object): Promise<Response \| any\>

*Defined in [src/websocket.ts:136](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L136)*

Requests to a specific discord API endpoint.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`method` | string | - | method, e.g: GET, POST, DELETE, PUT, etc. |
`path` | string | - | path of URL. |
`body` | object | null | body/data of Request. |

**Returns:** Promise<Response \| any\>

___

### setMaxListeners

▸ **setMaxListeners**(`n`: number): this

*Inherited from [Client](_websocket_.client.md).[setMaxListeners](_websocket_.client.md#setmaxlisteners)*

*Defined in node_modules/@types/node/events.d.ts:68*

#### Parameters:

Name | Type |
------ | ------ |
`n` | number |

**Returns:** this

___

### setStatus

▸ **setStatus**(`t`: \"online\" \| \"idle\" \| \"dnd\" \| \"invisible\"): void

*Defined in [src/websocket.ts:277](https://github.com/ourcord/ourcord/blob/175a597/src/websocket.ts#L277)*

The method used to set the status of the client.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`t` | \"online\" \| \"idle\" \| \"dnd\" \| \"invisible\" | The status type to set client's status to. |

**Returns:** void

___

### listenerCount

▸ `Static`**listenerCount**(`emitter`: EventEmitter, `event`: string \| symbol): number

*Inherited from [Client](_websocket_.client.md).[listenerCount](_websocket_.client.md#listenercount)*

*Defined in node_modules/@types/node/events.d.ts:44*

**`deprecated`** since v4.0.0

#### Parameters:

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string \| symbol |

**Returns:** number
