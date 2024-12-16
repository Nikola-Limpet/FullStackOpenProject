import { useEffect, useState } from 'react'
import Filter from './Components/Filter'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [searchPersons, setSearchPersons] = useState('')

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])

  const addPerson = (e) => {
    e.preventDefault()

    const newPersonObject = {
      name: newName,
      number: number,
      id: `${persons.length + 1}`
    }

    if (newPersonObject.name.trim() === "" || newPersonObject.number.trim() === "") {
      alert(`All fields are required`)
      return
    }

    if (persons.some(person => person.name === newPersonObject.name)) {
      alert(`${newPersonObject.name} is already added to the phonebook`)
      return
    }

    personService.create(newPersonObject)
      .then(data => setPersons(persons.concat(data)))
      .catch(err => {
        alert('Error occurred', err)
      })

    setNewName('')
    setNumber('')
  }

  const handleChangeName = (e) => {
    setNewName(e.target.value)
  }

  const handleChangeNumber = (e) => {
    setNumber(e.target.value)
  }

  const handleSearchName = (e) => {
    setSearchPersons(e.target.value)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      personService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(err => {
          alert('Error occurred', err)
        })
    }
  }

  const personsToShow = searchPersons === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchPersons.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPersons={searchPersons} handleSearchName={handleSearchName} />
      <PersonForm
        addPerson={addPerson}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        newName={newName}
        number={number}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App