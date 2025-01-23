import React from 'react'

const AnecdoteForm = ({ add }) => {

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='anecdote' /></div>
        <button type='sumbit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm