const server = require('http')
  .createServer((req, res) => {
    switch (req.url) {
      case '/api':
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ foo: 'bar' }))
        break
      case '/':
        res.writeHead(301, { location: '/home' })
        res.end()
        break
      case '/home':
        res.writeHead(200, { 'content-type': 'text/html' })
        res.end(
          '<html><body><h1>Home</h1><p>This is the home page!</p></body></html>',
        )
        break
      default:
        res.writeHead(404)
        res.end()
        break
    }
  })
  .listen(8000)
