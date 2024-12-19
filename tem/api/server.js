const express = require('express');
const app = express();
const cors = require('cors')
const port = 3000;

app.use(express.json());
app.use(cors())

let notes = [
  {
    "id": "1",
    "content": "HTML is easy",
    "important": true
  },
  {
    "id": "2",
    "content": "Browser can execute only JavaScript",
    "important": false
  },
  {
    "id": "3",
    "content": "GET and POST are the most important methods of HTTP protocol",
    "important": true
  },
  {
    "id": "4",
    "content": "Hi",
    "important": true
  },
  {
    "id": "5",
    "content": "hi",
    "important": true
  },
  {
    "id": "6",
    "content": "hi",
    "important": true
  },
  {
    "id": "7",
    "content": "hi",
    "important": true
  },
  {
    "id": "8",
    "content": "hi",
    "important": true
  },
  {
    "id": "9",
    "content": "sdad",
    "important": false
  },
  {
    "id": "10",
    "content": "sdada",
    "important": true
  },
];

app.get('/', (req, res) => { 
  res.send('Hello World');
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => Number(n.id))) : 0;
  return String(maxId + 1)
}
app.post('/api/notes', (req, res) => {
  const body = req.body;
  if(!body.content) {
    return res.status(400).json({
      error: 'messing content'
    })
  }
  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }
  notes = notes.concat(note)
  res.json(note)
});
// get a single note by id
app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find(note => note.id === id);
  
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

// delete a note 
app.delete('/api/notes/:id', (req,res) => {
  const id = Nubmer(req.params.id)
  const notes = notes.filter(n => n.id !== id)

  res.json(notes)
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});