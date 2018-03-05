const EventEmitter = require('events')

class Server extends EventEmitter {
  constructor(client) {
    super()
    this.items = []
    process.nextTick(() => {
      this.emit('response', 'Type command (help to list all commands)')
    })
    client.on('command', (command, item) => {
      switch (command) {
        case 'help':
        case 'add':
        case 'ls':
        case 'delete':
        case 'help':
          this[command](item)
          break
        default:
          this.emit('response', 'No such command')
      }
    })
  }
  help () {
    this.emit('response', 'commands: help, add, ls, delete')
  }
  add (item) {
    this.items.push(item)
    this.emit('response', `added: ${item}`)
  }
  ls() {
    this.emit('response', `items: ${this.items}`)
  }
  delete(item) {
    this.items = this.items.splice(this.items.indexOf(item), 1)
    this.emit('response', `deleted: ${item}`)
  }
}

module.exports = (client) => new Server(client)