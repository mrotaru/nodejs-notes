//process.stdout.write('\u001B[2J\u001B[0;0f')

const server = require('net').createServer()
let counter = 0

server.on('connection', socket => {
  socket.id = counter++
  console.log(`client connected (${socket.id})`)
  socket.write(`Welcome, client #${socket.id} !\n`)

  socket.on('data', data => {
    socket.write(`${socket.id}: `)
    socket.write(data)
  })
  socket.on('end', () => {
    console.log('client disconnected')
  })
})

server.listen(8000, () => console.log('server bound'))

