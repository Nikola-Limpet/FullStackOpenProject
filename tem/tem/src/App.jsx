import { useState } from 'react'
import Notes from './components/Notes'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(' a new static note...')
  // console.log(notes)
  const [showAll, setShowAll] = useState(true)


  const noteToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = (e) => {
    e.preventDefault()
    if (newNote.trim() === '') {
      alert('Note content cannot be empty')
      return
    }
    const noteObject = {
      content: newNote,
      important: false,
      id: String(notes.length + 1)
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {noteToShow.map(note =>
          <Notes key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>Add Note</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll === true ? "show important" : "show all"}
      </button>
    </div>
  )
}

export default App
