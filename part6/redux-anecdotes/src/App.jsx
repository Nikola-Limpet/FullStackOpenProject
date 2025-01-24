import { useSelector, useDispatch } from 'react-redux'
import { initializeAnecdotes, addNewAnec, vote } from './reducers/store'
import { setNotificationWithTimeout } from './reducers/notificationReducer'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
const App = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const filter = useSelector(state => state.filter)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const voteId = (id) => {
    dispatch(vote(id))
    const votedAnecdote = anecdotes.find(a => a.id === id)
    dispatch(setNotificationWithTimeout(`You voted for '${votedAnecdote.content}`, 5000))
  }

  const add = async (e) => {
    e.preventDefault()
    const newAnecdote = e.target.anecdote.value
    dispatch(addNewAnec(newAnecdote))
    e.target.anecdote.value = ''
    dispatch(setNotificationWithTimeout(`You created an anecdote '${newAnecdote}'`, 5000))
  }

  const filterAnecdotes = anecdotes && anecdotes.length
    ? anecdotes.filter(anecdote =>
      anecdote?.content?.toLowerCase().includes(filter.toLowerCase())
    )
    : []

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList anecdotes={filterAnecdotes} vote={voteId} />
      <AnecdoteForm add={add} />
    </div>
  )
}


export default App