require('dotenv').config()

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


const Person = require('./models/person')

app.get('/', (req, res) => {
  res.send({msg: 'hello guy'})
})

// app.get('/info/', (req,res) => {
//   const date  =  new Date()
//   res.send(`<p>Phonebook has info for ${persons.length} people</p> <br />
//     <p>${date}</p>`)
// })

// get all person
app.get('/api/persons/', (req, res) => {
  Person.find({}).then(result => {
    res.json(result)
  })
})

// get a single person
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  Person.findById(id).then(person => {
    if(!person) {
      res.json({msg: 'not found'}).status(404)
      return 
    }
    res.json(person)
  })
})

// delete a single phonebook entry
// app.delete('/api/persons/:id', (req, res) => {
//   const id = String(req.params.id);
//   persons = persons.filter(n => n.id !== id)
//   res.status(204).end()
// })

// add new phone book entries 
app.post('/api/persons/', (req, res) => {
  const body = req.body;
  if (!(body.name && body.number)) {
    res.send({error: "missing info"})
    return
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

const port = 3001 || process.env.PORT;

app.listen((port), () =>{
  console.log(
  `Sever running on port ${port}`
  )
}) 