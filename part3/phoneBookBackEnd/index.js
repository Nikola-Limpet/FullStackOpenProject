const express = require('express');
const morgan = require('morgan')
const cors = require('cors'); 
const app = express();

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))
app.use(cors())

// create  a custom token to log the requestion body
morgan.token('body', (req) => JSON.stringify(req.body));

//
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.send({msg: 'hello guy'})
})

app.get('/info/', (req,res) => {
  const date  =  new Date()
  res.send(`<p>Phonebook has info for ${persons.length} people</p> <br />
    <p>${date}</p>`)
})

// get all person
app.get('/api/persons/', (req, res) => {
  res.json(persons)
})

// get a single person
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(n => n.id == id)
  if(!person) {
    res.json({msg: 'not found'}).status(404)
    return 
  }
  res.send(person).status(200)
})

// delete a single phonebook entry
app.delete('/api/persons/:id', (req, res) => {
  const id = String(req.params.id);
  persons = persons.filter(n => n.id !== id)
  res.status(204).end()
})

// add new phone book entries 
app.post('/api/persons/', (req, res) => {
  const body = req.body;
  if (!(body.name && body.number)) {
    res.send({error: "missing info"})
    return
  }
  if (persons.some(p => p.name === body.name)) {
    res.status(400).send({ error: "name must be unique" });
    return;
  }
  const person = {
    name: body.name,
    number: body.number,
    id: String(Math.floor(Math.random() * 10000))
  }

  persons = persons.concat(person)
  res.send(persons)
  res.status(201)
})





const port = 3001 || process.env.PORT;

app.listen((port), () =>{
  console.log(
  `Sever running on port ${port}`
  )
}) 