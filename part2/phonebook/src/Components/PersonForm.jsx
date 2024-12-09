import React from 'react'

const PersonForm = ({ addPerson, newName, number, handleChangeName, handleChangeNumber }) => {

  return (
    <form onSubmit={addPerson}>
      <h2>Add a new</h2>
      <div>
        name: <input value={newName} onChange={handleChangeName} />
      </div>
      <br />
      <div>
        number: <input value={number} onChange={handleChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm