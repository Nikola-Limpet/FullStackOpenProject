import React from 'react'

const Filter = ({ handleFilter, filter }) => {

  return (
    <div>
      Find countries
      <input
        value={filter}
        onChange={handleFilter}
      />
    </div>
  )
}

export default Filter