import React from 'react'
import Language from './Language'
import Weather from './Weather'

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <Language country={country} />
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="100" />
      <Weather capital={country.capital} />
    </div>
  )
}

export default CountryInfo