- `node -p 'process.versoins.v8`
- `node --v8-options | grep "in progress`
- interesting v8 options: `--expose-gc`, `--trace-gc`
- can set v8 options at runtime: `v8.setFlagsFromString`
- node deps: `libuv`, `http-parser`, `c-ares`, `OpenSSL`, `zlib`

---

- when running the node repl, core modules are pre-loaded - which is not the case in script mode
- core modules - it's the stuff in `/lib`: https://github.com/nodejs/node/tree/master/lib (https://nodejs.org/api/modules.html#modules_core_modules)
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

---

- **`require` is sync**
- module loading algorithm: https://nodejs.org/api/modules.html#modules_all_together
- modules are cached after first load; unless resolves to a different file, same obj is returned
- `exports` object cannot be used inside timers
- more on cycles: https://nodejs.org/api/modules.html#modules_cycles

---

- when using `require`, it will wrap the file with a function
- https://nodejs.org/api/modules.html#modules_the_module_wrapper
- **exports, module** are not globals; they are args passed to the wrapper function by node
- `exports` is just a reference to `module.exports`:
```js
console.log(exports === require.main.exports) // true
console.log(exports === module.exports) // true
console.log(require.main === module) // true
```
- that's why assigning directly to `exports` has no effect on the exported value
- `require.main` is the initial module: https://github.com/nodejs/node/blob/master/lib/internal/module.js#L23
- node gives each module it's own `module` and `exports` (via the wrapper) but `require` is the same
- so if the initial module (`require.main`) is the same as the `module` passed by the wrapper, we know the file was run as a script
- see: [./add-foo.js](./add-foo.js)
- we can override `require` and our version will be passed to all subsequently loaded modules
