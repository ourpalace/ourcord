---
title: websocket
---

# websocket

<a name="Client"></a>

## <a href="#Client">Client</a>

**Kind**: global class  

* [Client](#Client)
  * [new Client(token, socket, config)](#new_Client_new)
    * [.destroy(reason)](#Client+destroy)
    * [.sendMessage(channel, content)](#Client+sendMessage)
    * [.MessageEmbed(channel, options)](#Client+MessageEmbed)
    * [.GetRestUser(userID)](#Client+GetRestUser)
    * [.evaluate(data, flag)](#Client+evaluate) ⇒ <code>string</code>
    * [.createChannel(g, name)](#Client+createChannel)

<a name="new_Client_new"></a>

### <a href="#new_Client_new">new Client(token, socket, config)</a>

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | the token used to login to the gateway |
| socket | <code>any</code> |  |
| config | <code>any</code> |  |

<a name="Client+destroy"></a>

### <a href="#Client+destroy">.destroy(reason)</a>

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Description |
| --- | --- | --- |
| reason | <code>string</code> | the reason the socket was closed |

<a name="Client+sendMessage"></a>

### <a href="#Client+sendMessage">.sendMessage(channel, content)</a>

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | the channel ID which the message will be sent in |
| content | <code>string</code> | the content to be sent |

<a name="Client+MessageEmbed"></a>

### <a href="#Client+MessageEmbed">.MessageEmbed(channel, options)</a>

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | the channel ID which the message will be sent in |
| options | <code>any</code> | the properties of the embed |

<a name="Client+GetRestUser"></a>

### <a href="#Client+GetRestUser">.GetRestUser(userID)</a>

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Description |
| --- | --- | --- |
| userID | <code>string</code> | the userID to get from Discord's rest API |

<a name="Client+evaluate"></a>

### <a href="#Client+evaluate">.evaluate(data, flag)</a> ->  <code>string</code>

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type |
| --- | --- |
| data | <code>any</code> |  
| flag | <code>any</code> |  

<a name="Client+createChannel"></a>

### <a href="#Client+createChannel">.createChannel(g, name)</a>

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>string</code> | the guild ID in which the channel should be created in |
| name | <code>string</code> | the name of the channel to be created |
