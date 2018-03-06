- a node server (created with `createServer`) will automatically create a new socket for each `connection`

- https://nodejs.org/api/dns.html
- methods in the `dns` module can either use OS utilities, or perform actual network requests
- the only method which uses OS utils is `dns.lookup`
- `dns` implements fairly low-level funtionality, such as retrieving particular record types (e.g: `MX`, `A`, etc)
- some record types have dedicated functions; ex: `resolver.resolveMx()`
- can use `resolveAny()` to get all record types