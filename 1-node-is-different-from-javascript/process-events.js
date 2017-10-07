process.on('exit', (code) => console.log('about to exit'))
process.on('uncaughtException', (ex) => console.log(ex))
process.stdin.resume()
console.dog()
