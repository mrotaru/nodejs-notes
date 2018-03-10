const http = require('http')

const req = http.request(
  {
    hostname: 'www.google.com',
  },
  res => {
    console.log(Object.keys(res))
    console.log(res.statusCode)
    console.log(res.headers)
    res.on('data', chunk => {
      console.log(chunk.toString())
    })
  },
)

req.on('error', err => console.error(err))

req.end()
