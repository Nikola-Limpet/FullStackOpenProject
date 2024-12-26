const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config()

app.use(express.json());
app.use(express.static('dist'))
app.use(cors())


const Note = require('./models/note')

app.get('/', (req, res) => { 
  res.send('Hello World');
});

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})


app.post('/api/notes', (req, res) => {
  const body = req.body;
  if(!body.content) {
    return res.status(400).json({
      error: 'messing content'
    })
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  note.save().then(savedNote => {
    res.json(savedNote)
  })
})
  
// get a single note by id
app.get('/api/notes/:id', (req, res) => {
  // const id = Number(req.params.id);
  // const note = notes.find(note => note.id === id);
  Note.findById(req.params.id).then(note => {
    res.json(note)
  })
});

// delete a note 
app.delete('/api/notes/:id', (req,res) => {
  const id = Nubmer(req.params.id)
  const notes = notes.filter(n => n.id !== id)

  res.json(notes)
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});