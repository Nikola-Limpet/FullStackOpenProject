require('dotenv').config()
const mongoose = require('mongoose')


const url = process.env.MONGO_DB_URI;

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.error(err)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    require: true
  },
  number: String,
})

personSchema.set('toJSON', {
  transform: (doc, returnedPersonObj) => {
    returnedPersonObj.id = returnedPersonObj._id
    delete returnedPersonObj._id
    delete returnedPersonObj.__v
  }
})


module.exports = mongoose.model('Person', personSchema)