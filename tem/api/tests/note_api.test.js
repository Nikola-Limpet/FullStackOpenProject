const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const Note = require('../models/note')
const supertest = require('supertest')
const app = require('../app')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    importand: true,
  },
]
beforeEach(async () => {
  await Note.deleteMany({})

  let noteObject = new Note(initialNotes[0])
  await noteObject.save()

  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})


const api = supertest(app)

test('notes are returned as json', async () => {
  await api.get('/api/notes')
        .expect(200)
        .expect('Content-type', /application\/json/)
})


test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('a specific note is within a returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)
  assert(contents.includes('Browser can execute only JavaScript'))
})

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const notesAtEnd = await helper.notesInDb() // get all note in db from helper function

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length +  1) // add one note and comp the length

  const contents = notesAtEnd.map(r => r.content)

  assert(contents.includes('async/await simplifies making async calls'))
})

test('note without content is not added', async () => {
  const newNote = new Note({
    important: true
  })
  await api
    .post('/api/notes/')
    .send(newNote)
    .expect(400)

  const notesAtEnd = await helper.notesInDb()

  assert.strictEqual(notesAtEnd.length , helper.initialNotes.length)
})

after(async () => {
  await mongoose.connection.close()
})