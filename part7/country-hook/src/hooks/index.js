import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [found, setFound] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (name) {
      setLoading(true)
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => {
          setCountry({
            name: response.data.name.common,
            capital: response.data.capital[0],
            population: response.data.population,
            flag: response.data.flags.png
          })
          setFound(true)
        })
        .catch(() => {
          setCountry(null)
          setFound(false)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [name])

  return {
    data: country,
    found,
    loading
  }
}