const fs = require('fs')

const server = require('https')
  .createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
  })

server.on('request', (req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain' })
  res.end('hello, this is a https server!\n')
}).listen(8000)
