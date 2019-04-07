import http from 'http'
import app from './server'

const server = http.createServer(app)

server.listen(3000)

console.log("Server running at http://localhost:3000")

let currentApp = app

if (module.hot) {
  module.hot.accept('./server', () => {
    server.removeListener('request', currentApp)
    currentApp = require('./server').default
    server.on('request', currentApp)
  })
}
