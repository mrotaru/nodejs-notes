console.log(require.main)

const addFoo = (str) => `${str}Foo`

if (require.main === module) { // this file was run as a script: `node add-foo.js <params>`
	console.log(addFoo(process.argv[2]))
} else { // this file was required: `const addFoo = require('./add-foo.js')`
	module.exports = addFoo
}
