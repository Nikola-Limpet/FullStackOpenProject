import { useSelector, useDispatch } from 'react-redux'
import { voteFor, addNew } from './reducers/store'
import { setNotificationWithTimeout } from './reducers/notificationReducer'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const filter = useSelector(state => state.filter)
  // filter state is '' from start
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
    const votedAnecdote = anecdotes.find(a => a.id === id)
    dispatch(setNotificationWithTimeout(`You voted for '${votedAnecdote.content}`, 5000))
  }
  const add = (e) => {
    e.preventDefault()
    const newAnecdote = e.target.anecdote.value
    dispatch(addNew(newAnecdote))
    e.target.anecdote.value = ''
    dispatch(setNotificationWithTimeout(`You created an anecdote '${newAnecdote}'`, 5000))
  }

  const filterAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList anecdotes={filterAnecdotes} vote={vote} />
      <AnecdoteForm add={add} />
    </div>
  )
}


export default App