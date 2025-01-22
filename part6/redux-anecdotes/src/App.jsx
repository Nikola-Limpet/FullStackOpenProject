import { useSelector, useDispatch } from 'react-redux'
import { voteFor, addNew } from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))
  }
  const add = (e) => {
    e.preventDefault()
    const newAnecdote = e.target.anecdote.value
    dispatch(addNew(newAnecdote))
    e.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList anecdotes={anecdotes} vote={vote} />
      <AnecdoteForm add={add} />
    </div>
  )
}

export default App