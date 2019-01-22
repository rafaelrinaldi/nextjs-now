const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000

const app = next({ dev })
const handle = app.getRequestHandler()

async function main (req, res) {
  const parsedUrl = parse(req.url, true)
  const { pathname } = parsedUrl

  if (/^\/(foo|bar)/.test(pathname)) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(`${pathname} - test`)
  }

  handle(req, res)
}

async function setup (handler) {
  await app.prepare()
  return createServer(handler).listen(port, error => {
    if (error) throw error
    console.log(`Server ready at "http://localhost:${port}"`)
  })
}

setup(main)
