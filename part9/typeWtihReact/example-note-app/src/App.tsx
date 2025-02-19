import React, { useEffect, useState } from 'react'
import { getAllNotes, createNote } from '../services/note'

export interface Note {
  id: string;
  content: string;
};

export type NewNote = Omit<Note, 'id'>;

const App = () => {
  const [notes, setNotes] = useState<Note[]>([
  ]);
  const [newNote, setNewNote] = useState('')
  

  useEffect(() => {
    getAllNotes().then(data => {
      setNotes(data)
    })
  }, [])
  const noteCreation = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createNote({ content: newNote }).then(data => {      
      setNotes(notes.concat(data))    
    })
    setNewNote('')
  }

  return (
    <div>
      <form onSubmit={noteCreation}> 
        <input 
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button type='submit'>add</button>
      </form>
      <ul> 
        {notes.map(note =>
          <li key={note.id}>{note.content}</li>
        )}
      </ul>
    </div>
  )
}

export default App;