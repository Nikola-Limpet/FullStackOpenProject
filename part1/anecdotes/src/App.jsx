import { useEffect, useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0)) // [0,0,0,...] for all index in the array

  const handleVote = () => {
    const newVotes = [...votes]; // copy ythe values 
    newVotes[selected] += 1;
    // get in to the current position and incret a value it by one if the user click the button
    setVotes(newVotes)
  }
  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes.
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleClick}>Next Anecdote</button>
      </div>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[votes.indexOf(Math.max(...votes))]} <br />
      has {votes[votes.indexOf(Math.max(...votes))]} votes
    </div>
  )
}

export default App