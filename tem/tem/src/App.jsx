import { useEffect, useState } from 'react'
import Notes from './components/Notes'
import axios from 'axios'
import noteServices from './services/notes'
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  // console.log(notes)
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteServices.getAll().then(initialNote => setNotes(initialNote))
  }, [])

  const noteToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = (e) => {
    e.preventDefault()
    if (newNote.trim() === '') {
      alert('Note content cannot be empty')
      return
    }
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: String(notes.length + 1)
    }

    noteServices.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    }
    )
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteServices
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {noteToShow.map(note =>
          <Notes
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>Add Note</button>


      </form>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? "show important" : "show all"}
      </button>
    </div>
  )
}

export default App
