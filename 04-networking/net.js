//process.stdout.write('\u001B[2J\u001B[0;0f')

const server = require('net').createServer()
let counter = 0
let sockets = []

server.on('connection', socket => {
  socket.id = counter++
  sockets.push(socket)
  console.log(`client connected (${socket.id})`)
  socket.write(`Welcome, client #${socket.id} !\n`)

  socket.on('data', data => {
    sockets
      .filter(_socket => _socket.id !== socket.id)
      .map(_socket => _socket.write(`${_socket.id}: ${data}`))
  })
  socket.on('end', () => {
    sockets = sockets.filter(s => s.id !== socket.id)
    console.log(`client ${socket.id} disconnected; remaining clients: ${sockets.length}`)
  })
})

server.listen(8000, () => console.log('server bound'))

