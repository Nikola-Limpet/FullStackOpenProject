const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGO_DB_URI)

// Connect to DB
mongoose.connect(config.MONGO_DB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// Buildin MiddleWare
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)


// get Router Obej of note app contain CRUD
// can be isolate in its own dir which's Routes
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

// custom error middlewares
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


// export app to use in the main entry point in server.js or index.js
module.exports = app