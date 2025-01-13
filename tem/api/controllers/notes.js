const notesRouter = require('express').Router()
const jwt = require('jsonwebtoken')


const Note = require('../models/note')
const User = require('../models/user')



const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('user', { username: 1,  name: 1})
  res.json(notes)
})
notesRouter.get('/:id', async (req, res) => {

  const note = await Note.findById(req.params.id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})


notesRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

  if (!body.content) {
      return res.status(400).json({ error: 'content missing' })
    }
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  } 
  const user = await User.findById(decodedToken.id)
  
  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false: body.important,
    user: user._id
  })
  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  res.status(201).json(savedNote)
})


notesRouter.delete('/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

notesRouter.put('/:id', (req, res, next) => {
  const body = req.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => next(error))
})





module.exports = notesRouter
