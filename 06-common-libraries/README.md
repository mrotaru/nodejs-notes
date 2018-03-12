## os
- https://nodejs.org/dist/latest-v9.x/docs/api/os.html
- `EOL` - `\n` on POSIX, `\r\n` on Windows
- `homedir()`, `tmpdir()`, `freemem()`, `totalmem()`, `hostname()`
- to get the current directory: `process.cwd()`
- `type()` - `Windows_NT` / `Linux` / `Darwin`
- `platform()` - `aix` / `darwin`/ `freebsd` / `linux` / `openbsd` / `sunos` / `win32`
 - `release()` see: https://en.wikipedia.org/wiki/Uname#Examples

## fs
- **always use `path.join` when concatenating paths** - avoids cross-platform issues
- `fs.open` will allocate a new file descriptor which **must be closed**
- almost all `fs` functions use libuv threadpool; consider increasing `UV_THREADPOOL_SIZE`
- `fs.write()` can be used to partially write to a file - an uncommon operation
- `fs.writeFile('foo.txt', 'some text', (err))` writes an entire file
- using an `options` object: `fs.writeFile('foo.txt', 'foo', { mode: 0o664 }, cb)`
- `fs.exists()` is deprecated because unconsistent callback & it's not really needed
- `fs.existsSync()` is not deprecated and can still be used
- tmp dirs: `fs.mkdtemp(path.join(os.tmpdir(), 'foo-'), (err, folder))`
- `fs.realpath('../../foo', (err, resolvedPath))` => `/home/mihai/foo` (dep. on cwd)
- `fs.realpath` will not perform case conversion on Windows

### WHATWG URLs
- can use [WHATWG URL](https://url.spec.whatwg.org/) objects for paths: `fs.readFile(new url.URL('file:///foo.txt'))`
- hostname must be `localhost` or empty in WHATWG URL's, except for Windows
- `fs.readFile(new url.URL('file://hostname/foo.txt'))` throws on all OSes, except for Win
- `fs.readFile(new url.URL('file://localhost/foo.txt'))` OK
- `fs.readFile(new url.URL('file:///foo.txt'))` OK
- cannot have encoded `\` or `/` in WHATWG URLs

### WHATWG file URLs on Windows
- can have hostnames
- with hostname convert to UNC path: `file://hostname/foo/bar` => `\\hostname\foo\bar`
- with drive letters convert to absolute path: `file:///C:/foo/bar` => `C:\foo\bar`
- must have drive letter if no hostname; drive letter must be followed by semicolon
  - `fs.readFileSync(new URL('file:///notdriveletter/foo/bar'))` throws
  - `fs.readFileSync(new URL('file:///c/foo/bar'))` throws
  - `fs.readFileSync(new URL('file:///c:/foo/bar'))` OK

### Watching for file/folder changes
- node has two functions: `fs.watch()` and `fs.watchFile()`
- due to OS differences, both have issues but `fs.watch()` is prefferable
- not sure why `fs.watchFile()` exists, not clear from the docs what it has over `fs.watch()`
- [chokidar](https://github.com/paulmillr/chokidar) is used extensively for this kind of stuff

### stats
`fs.stat()` can be used to get "stats" about files and directories