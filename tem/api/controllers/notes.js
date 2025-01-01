const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})
notesRouter.get('/:id', (req, res, next) => {
  Note.findById(req.params.id)
  .then(note => {
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  })
  .catch((err) => next(err))
})


notesRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body

    if (!body.content) {
      return res.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
      content: body.content,
      important: body.important || false,
    })
    const savedNote = await note.save()
    res.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})


notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => next(err))
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
