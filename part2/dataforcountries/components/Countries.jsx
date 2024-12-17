import CountryInfo from "./CountryInfo"
import React, { useState } from 'react'

const Countries = ({ countries, filterVal }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  let filtered = []

  const handleShowCountry = (country) => {
    setSelectedCountry(selectedCountry?.cca3 === country.cca3 ? null : country)
  }

  if (filterVal === '') {
    return (
      <div>
        Start typing to filter countries
      </div>
    )
  }

  if (filterVal.length > 0) {
    filtered = countries.filter(country =>
      country.name && country.name.common.toLowerCase().includes(filterVal.toLowerCase())
    )
  } else {
    filtered = countries
  }

  if (filtered.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if (filtered.length === 1) {
    const country = countries.find(country => country.name.common === filtered[0].name.common)
    return (
      <div>
        <CountryInfo country={country} />
      </div>
    )
  } else {
    return (
      <div>
        {filtered.map(country => (
          <div key={country.cca3}>
            {country.name.common}
            <button onClick={() => handleShowCountry(country)}>
              {selectedCountry?.cca3 === country.cca3 ? 'Hide' : 'Show'}
            </button>
            {selectedCountry?.cca3 === country.cca3 && <CountryInfo country={country} />}
          </div>
        ))}
      </div>
    )
  }
}

export default Countries