import { useSelector, useDispatch } from 'react-redux'
import { voteFor, addNew } from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'

const App = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const filter = useSelector(state => state.filter)
  // filter state is '' from start
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
  }
  const add = (e) => {
    e.preventDefault()
    const newAnecdote = e.target.anecdote.value
    dispatch(addNew(newAnecdote))
    e.target.anecdote.value = ''
  }

  const filterAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList anecdotes={filterAnecdotes} vote={vote} />
      <AnecdoteForm add={add} />
    </div>
  )
}


export default App