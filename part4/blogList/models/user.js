const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  username: { type: String, minLength: 3, require: true},
  name: String,
  passwordHash: { type: String, require: true },
  blogs: {
    type: mongoose.Types.ObjectId,
    ref: 'Blog'
  }
})

// tranform collect 
userSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()

    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User