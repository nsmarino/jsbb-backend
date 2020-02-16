// structure notes:
// imports and uses all middleware from utils/middleware
// middleware includes Routers for different routes
// connects to database

const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const threadsRouter = require('./controllers/threads')
const postsRouter = require('./controllers/posts')

const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
    })  
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)    
  })

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/posts', postsRouter)
app.use('/api/threads', threadsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

// app.get('/', (req, res) => {
//     res.send('<h1>If you are seeing this something is wrong.</h1>')
// })
// const generateId = () => {
//   const maxId = notes.length > 0
//   ? Math.max(...notes.map(n => n.id)) : 0
//   return maxId + 1
// }