import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [searchPersons, setSearchPersons] = useState('')
  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(res => {
      const data = res.data
      setPersons(data)
    })
  }, [])
  const addPerson = (e) => {
    e.preventDefault()

    const newPersonObject = {
      name: newName,
      number: number,
      id: persons.length + 1
    }
    if (newPersonObject.name.trim() === "" || newPersonObject.number.trim() === "") {
      alert(`All filed are required`)
      return
    }
    if ((persons.filter(person => person.name === newPersonObject.name).length > 0)) {
      alert(`${newPersonObject.name} is already added to the phonebook`)
      return
    }
    setPersons(persons.concat(newPersonObject))
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
      <Persons personsToShow={personsToShow} />

    </div>
  )
}

export default App