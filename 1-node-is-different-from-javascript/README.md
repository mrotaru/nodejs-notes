- `node -p 'process.versoins.v8'
- `node --v8-options | grep "in progress"
- interesting v8 options: `--expose-gc`, `--trace-gc`
- can set v8 options at runtime: `v8.setFlagsFromString`
- node deps: `libuv`, `http-parser`, `c-ares`, `OpenSSL`, `zlib`

---

- when running the node repl, core modules are pre-loaded - which is not the case in script mode
- core modules - I think it's the stuff in `/lib`: https://github.com/nodejs/node/tree/master/lib
- install `rlwrap` to use reverse search: `NODE_NO_READLINE=1 rlwrap node`
- `_` is the result of the last executed command
- `.help` - dot commands: `break`, `clear`, `editor`, `help`, `load`, `save`
- `repl.start` to customise the session (https://nodejs.org/api/repl.html#repl_repl_start_options)
- customised repl: [`./repl.js`](./repl.js)
- `process.argv`: all values are strings; first value: `node`

---

- modules are wrapped, so `var a=42` doesn't mean it's global
- `global.a = 42` => `a` can be accessed from any module which requires
- **you're not a `node` expert unless you recognize and know how to use everything on `global`**
- `process.env` - read-only copy of system env
- `process.release.lts` - it's `undefined` if not running an lts release
- `process` is an event emitter:
- `process.on('exit')` - when the event loop has nothing to do, or `process.exit()`
- only sync stuff in `exit` handler; can't use the event loop
- `process.on('uncaughtException')
- **if a handler is registered, node will not exit!**
- so: register handler on `uncaughtException` because can do async, and when cleanup is done, manually exit
- when reading from files without specifying encoding, you get a `Buffer`
- `Buffer` cannot be resized
```js
const string = 'touché' // length: 6
const buffer = Buffer.from('touché') // length: 7
```
- `Buffer.from`: [./buffers.js](./buffers.js)


