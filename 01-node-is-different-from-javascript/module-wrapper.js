// exports, require, module, ...
console.log(exports === require.main.exports)
console.log(exports === module.exports)
console.log(require.main === module)
