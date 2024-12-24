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

    if (persons.some(person => person.name === newPersonObject.name)) {
      alert(`${newPersonObject.name} is already added to the phonebook`)
      return
    }
    personService.create(newPersonObject)
      .then(data => {
        setPersons(persons.concat(data))
        setNotifyMesssage({
          msg: `Added ${newPersonObject.name} successfully!`,
          status: 'success'
        })
      })
      .catch(err => {
        setNotifyMesssage({
          msg: `The error occure check the please check the console ${err}`,
          status: 'error',
        }),
          setTimeout(() => {
            setNotifyMesssage(null)
          }, 5000)
      })
      .finally(
        setNotifyMesssage({
          msg: `Added ${person.name} successfully!`,
          status: 'success'
        }),
        setTimeout(() => {
          setNotifyMesssage(null)
        }, 5000)
      )
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
        })
        .catch(err => {
          setNotifyMesssage({
            msg: `The error occure check the please check the console ${err}`,
            status: 'error',
          }),
            setTimeout(() => {
              setNotifyMesssage(null)
            }, 5000)
        })
        .finally(
          setNotifyMesssage({
            msg: `Deleted ${person.name} successfully!`,
            status: 'success'
          }),
          setTimeout(() => {
            setNotifyMesssage(null)
          }, 5000)
        )
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