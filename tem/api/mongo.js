const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGO_DB_URI;

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .then(() => {
    console.log('note saved!')
    return mongoose.connection.close()
  })
  .catch((err) => {
    console.error('error connecting to MongoDB:', err)
  })


  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  })
  
  noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Note', noteSchema)