import { useEffect, useState } from 'react'
import Filter from './Components/Filter'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'
import personService from './services/person'
import Notification from './Components/Notification'
import person from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [searchPersons, setSearchPersons] = useState('')
  const [notifyMessage, setNotifyMesssage] = useState({
    msg: null,
    status: ''
  }
  )
  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])

  const addPerson = (e) => {
    e.preventDefault()

    const newPersonObject = {
      name: newName,
      number: number,
    }

    if (newPersonObject.name.trim() === "" || newPersonObject.number.trim() === "") {
      alert(`All fields are required`)
      return
    }

    const existingPerson = persons.find(person => person.name === newPersonObject.name)
    if (existingPerson) {
      if (window.confirm(`${newPersonObject.name} is already added to the phonebok, replace the old number with a new one?`)) {
        personService.update(existingPerson.id, newPersonObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson))
            setNotifyMesssage({
              msg: `Updated ${newPersonObject.name} successfully!`,
              status: 'success'
            })
            setTimeout(() => {
              setNotifyMesssage(null)
            }, 5000)

          })
          .catch(err => {
            setNotifyMesssage({
              msg: `The error occurred, please check the console ${err}`,
              status: 'error',
            })
            setTimeout(() => {
              setNotifyMesssage(null)
            }, 5000)
          })
      }
    } else {
      personService.create(newPersonObject)
        .then(data => {
          setPersons(persons.concat(data))
          setNotifyMesssage({
            msg: `Added ${newPersonObject.name} successfully!`,
            status: 'success'
          })
          setTimeout(() => {
            setNotifyMesssage(null)
          }, 5000)
        })
        .catch(err => {
          setNotifyMesssage({
            msg: `The error occurred, please check the console ${err}`,
            status: 'error',
          })
          setTimeout(() => {
            setNotifyMesssage(null)
          }, 5000)
        })
    }
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
      const person = persons.find(p => p.id === id)
      personService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setNotifyMesssage({
            msg: `Deleted ${person.name} successfully!`,
            status: 'success'
          })
          setTimeout(() => {
            setNotifyMesssage(null)
          }, 5000)
        })
        .catch(err => {
          setNotifyMesssage({
            msg: `The error occurred, please check the console ${err}`,
            status: 'error',
          })
          setTimeout(() => {
            setNotifyMesssage(null)
          }, 5000)
        })
    }
  }

  const personsToShow = searchPersons === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchPersons.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifyMessage} />
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