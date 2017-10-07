const fs = require('fs')
const map = { '88': '65' }
fs.readFile(__filename, (err, buff) => {
	let tag = buff.slice(-4, -1)
	tag.forEach((el,i) => {
		tag[i] = map[tag[i]]
	})
	console.log(buff.toString())
})
// TAG: XXX
