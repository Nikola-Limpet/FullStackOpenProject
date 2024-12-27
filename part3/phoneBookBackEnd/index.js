require('dotenv').config()

const express = require('express');
const morgan = require('morgan')
const cors = require('cors'); 
const app = express();

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))
app.use(cors())

// create a custom token to log the request body
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const Person = require('./models/person')

app.get('/', (req, res) => {
  res.send({msg: 'hello guy'})
})

// get all persons
app.get('/api/persons/', (req, res, next) => {
  Person.find({})
    .then(result => {
      res.json(result)
    })
    .catch(err => next(err))
})

// get a single person
app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

// delete a single phonebook entry
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

// update phone number if the user inputs the same name that already exists
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' });
  }
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
})

// add new phone book entries 
app.post('/api/persons/', (req, res, next) => {
  const body = req.body;
  if (!(body.name && body.number)) {
    res.status(400).send({ error: "missing info" });
    return;
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(err => next(err))
})

// handler of requests with result to errors
const errorHandler = (err, req, res, next) => {
  console.log(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  next(err)
}
app.use(errorHandler)

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});