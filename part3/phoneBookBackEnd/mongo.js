const mongoose = require('mongoose')

if (process.argv.length < 5) {
  console.log('Please provide the password, name, and number as arguments: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://ddas1221lp:${password}@phonebook1.r1tn8.mongodb.net/phonebook-app?retryWrites=true&w=majority&appName=phonebook1`


mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')

    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    const person = new Person({
      name: name,
      number: number,
    })

    return person.save()
    .then(() => {
      console.log(`added ${name} number ${number} to phone book`)
      return Person.find({})
    })
    .then(persons => {
      console.log('phonebook:')
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      return mongoose.connection.close()
    })
})
.catch((err) => {
  console.error(err)
})