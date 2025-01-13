import { useEffect, useState } from 'react'
import Notes from './components/Notes'
// import axios from 'axios'
import noteServices from './services/notes'
import Notification from './components/Notification'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  // console.log(notes)
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMesssage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  useEffect(() => {
    noteServices.getAll().then(initialNote => setNotes(initialNote))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteServices.setToken(user.token)
    }
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login with', username, password)

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteServices.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMesssage('Wrong credentials')
      setTimeout(() => {
        setErrorMesssage(null)
      }, 5000)
    }
  }

  const noteToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = (e) => {
    e.preventDefault()
    if (newNote.trim() === '') {
      alert('Note content cannot be empty')
      return
    }
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    noteServices.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteServices
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        setErrorMesssage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMesssage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id)) // the deleted note get filter out 
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
          handleChangeUsername={(e) => setUsername(e.target.value)}
          handleChangePassword={(e) => setPassword(e.target.value)}
        />
      ) : (
        <div>
          <p> {user.username} Logged-In </p>
          <NoteForm
            addNote={addNote}
            newNote={newNote}
            handleNoteChange={handleNoteChange}
          />
        </div>
      )}
      {user !== null && (
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            {showAll ? "show important" : "show all"}
          </button>

        </div>
      )}
      <ul>
        {noteToShow.map(note =>
          <Notes
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App