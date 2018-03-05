const EventEmitter = require('events')
const emitter = new EventEmitter()

// If an 'error' event is emitted, the handler is called synchronously. Since
// there is no handler, this will result in an exception. Note that a handler
// for 'uncaughtException' is registered after this - which means it will not be
// called.
emitter.emit('error', 'foobar')
process.on('uncaughtException', (arg) => {
  // To have this handler called, register it **before** any unhandled 'error'
  // events are emitted
  console.log('uncaught exception handler', arg)
})
