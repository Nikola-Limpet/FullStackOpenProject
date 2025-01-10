const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
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

// Built-in Middleware
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

// Use router
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

// Custom error middlewares
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;