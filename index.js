/* eslint-disable linebreak-style */

// structure notes:
// used for starting application
// imports application from app
// env variables are imported from utils.config
// uses node http module to serve site
const app = require('./app')
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})