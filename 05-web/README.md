- https://nodejs.org/dist/latest-v9.x/docs/api/http.html
- the node HTTP interfaces are very low-level
- `http.request(opts, cb)` - `cb` will be registered as a handler for the `response` event 
- one **must** call `req.end()` - that's when the request will actually be sent
- ... except when using `http.get(...)`, which [calls it automatically]( https://nodejs.org/dist/latest-v9.x/docs/api/http.html#http_http_get_options_callback)
 - why is `req` (request) a **writable** stream ? for `POST` requests; `req.write(postData)`
- to access the body of received response, handle the `data` event
- `data` event will not be emitted when there is no response body (eg in a redirect)
- `data` event is actually [emitted by the socket]( https://nodejs.org/dist/latest-v9.x/docs/api/net.html#net_event_data)

### Classes
- `http.get(...)` returns an instance of [http.ClientRequest](https://nodejs.org/dist/latest-v9.x/docs/api/http.html#http_class_http_clientrequest)
- the callback gets as a param an instance of [http.IncomingMessage](https://nodejs.org/dist/latest-v9.x/docs/api/http.html#http_class_http_incomingmessage)
- `const server = http.createServer()` returns an instance of [http.Server](https://nodejs.org/dist/latest-v9.x/docs/api/http.html#http_class_http_server)
- server `request` callback gets [http.IncomingMessage](https://nodejs.org/dist/latest-v9.x/docs/api/http.html#http_class_http_incomingmessage) 
and [http.ServerResponse](https://nodejs.org/dist/latest-v9.x/docs/api/http.html#http_class_http_serverresponse) as params
- see [./classes.js](./classes.js)

### Events
- ClientRequest: (`W`) `abort`, `connect`, `continue`, `response`, `socket`, `timeout`, `upgrade` 
- Server: `checkContinue`, `checkException`, `clientError`, `close`, `connect`, `connection`, `request`, `upgrade`
- ServerResponse: (`W`) `close`, `finish`
- IncomingMessage: (`R`) `aborted`, `close`

### httpie notes
- to test streaming servers, add `--stream` (https://httpie.org/doc#streamed-responses)
- it will not assume protocol based on port number; to test https, secify it: `http --verify=no https://localhost:443
