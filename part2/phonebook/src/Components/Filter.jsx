import React from 'react'

const Filter = ({ searchPersons, handleSearchName }) => {

  return (
    <div>
      filter shown with <input value={searchPersons} onChange={handleSearchName} />
    </div>
  )
}

export default Filter