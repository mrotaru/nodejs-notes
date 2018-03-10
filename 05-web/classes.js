const http = require('http')
const net = require('net')

const server = http.createServer() // http.Server
server.on('request', (req, res) => {
  // req: http.IncomingMessage
  // res: http.ServerResponse
})

// the above is equivalent to:
// const server = http.createServer((req, res) => {})

const req = http.request('www.google.com', res => { // req: http.ClientRequest
  // res: http.IncomingMessage
  res.on('data', chunk => { // IncomingMessage implements Readable Stream, hence 'data' event
  })
})