import React from 'react'

const Language = ({ country }) => {
  return (
    <ul>
      {country.languages && Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
    </ul>
  )
}
export default Language
