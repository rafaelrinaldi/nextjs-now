const { parse } = require('url')

module.exports = (request, response) => {
  const parsedUrl = parse(request.url, true)
  const { pathname } = parsedUrl
  response.end(`${pathname} - test`)
}
