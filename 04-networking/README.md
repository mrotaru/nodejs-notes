## Server
- https://nodejs.org/dist/latest-v9.x/docs/api/net.html#net_class_net_server
- will automatically create a new socket for each `connection`
- events: `close`, `connection`, `error`, `listening`

## Socket
- https://nodejs.org/dist/latest-v9.x/docs/api/net.html#net_class_net_socket
- duplex stream
- sockets (eg, as returned from `createConnection`) can be used to directly communicate with servers
- events: `close`, `connect`, `data`, `drain`, `end`, `error`, `lookup`, `timeout`

## DNS
- https://nodejs.org/api/dns.html
- methods in the `dns` module can either use OS utilities, or perform actual network requests
- the only method which uses OS utils is `dns.lookup`
- `dns` implements fairly low-level funtionality, such as retrieving particular record types (e.g: `MX`, `A`, etc)
- some record types have dedicated functions; ex: `resolver.resolveMx()`
- can use `resolveAny()` to get all record types

## UDP
- node comes with built-in support for `UDP`: https://nodejs.org/api/dgram.html
```js
const server = dgram.createSocket('udp4') // create server; client created same way`
server.on('message', (msg, rinfo) => console.log('received:', msg)) // server got a message`
client.send(msg, PORT, ADDR, cb) // client sending a message
```