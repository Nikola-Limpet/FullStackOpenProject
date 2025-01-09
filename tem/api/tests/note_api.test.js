const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const helper = require('./test_helper')

const Note = require('../models/note')
const User = require('../models/user')

describe('when there are some notes saved initialy', () => {

  beforeEach(async () => {
    await Note.deleteMany({}) // delete all collections
  
    // const noteObjects = helper.initialNotes.map(note => new Note(note))
    // const promiseArray = noteObjects.map(note => note.save())
    // await Promise.all(promiseArray) // promise all take iterable arr and return a single promise
    // that is fullfilled

    await Note.insertMany(helper.initialNotes)
    })

    test('notes are returned as json', async () => {
      console.log('entered the test')
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

    describe('viewing a specific note', () => {
      test('succeeds with a valid id', async () => {
        const notesAtStart = await helper.notesInDb()
  
        const noteToView = notesAtStart[0]
  
        const resultNote = await api
          .get(`/api/notes/${noteToView.id}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)
  
        assert.deepStrictEqual(resultNote.body, noteToView)
      })

      test('fails with statuscode 404 if note does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()
  
        await api
          .get(`/api/notes/${validNonexistingId}`)
          .expect(404)
      })
  
      test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'
  
        await api
          .get(`/api/notes/${invalidId}`)
          .expect(400)
      })
    })

    describe('addition of a new note', () => {
      test('succeeds with a valid data', async () => {
        const newNote = {
          content: 'async/await simplifies making async calls',
          important: true,
        }

        await api
          .post('/api/notes')
          .send(newNote)
          .expect(201)
          .expect('Content-Type', /application\/json/)
        
        const notesAtEnd = await helper.notesInDb()
        assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)
        
        const content = notesAtEnd.map(note => note.content)
        assert(content.includes('async/await simplifies making async calls'))
      })

      test('fails with status code 400 if data is invalid', async() => {
        const newNote = {
          important: true
        }
        await api
          .post('/api/notes')
          .send(newNote)
          .expect(400)

        const notesAtEnd = await helper.notesInDb()

        assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
      })
    })

    describe('deletion of a note', () => {
      test('succeeds with status 204 if id is valid', async() => {
        const notesAtStart = await helper.notesInDb()

        const noteToDelete = notesAtStart[0]

        await api
          .delete(`/api/notes/${noteToDelete.id}`)
          .expect(204)

        const notesAtEnd = await helper.notesInDb()

        assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)

        const content = notesAtEnd.map(note => note.content)
        assert(!content.includes(noteToDelete.content))
      })
    })

})
describe('when there is initially one user id in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Yuujin Andromeda',
      name: 'Yuujin',
      password: 'Asfd',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const userNames = usersAtEnd.map(u => u.username)
    assert(userNames.includes(newUser.username))
  })

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})
  
after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})