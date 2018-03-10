const server = require('http').createServer()

server.timeout = 1000
server
  .on('request', (req, res) => {
    console.log('got request')
    res.writeHead(200, { 'content-type': 'text/plain' })
    res.write('Hello\n')

    setTimeout(() => res.write('foo\n'), 1000)
    setTimeout(() => res.write('bar\n'), 2000)
  })
  .listen(8000)
