import React, { useState, useEffect } from 'react'
import Filter from '../components/Filter'
import Countries from '../components/Countries'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      }).catch(error => {
        console.log(error)
      }
      )
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  return (
    <>
      <Filter handleFilter={handleFilter} filter={filter} />
      <Countries countries={countries} filterVal={filter} />
    </>
  )
}

export default App