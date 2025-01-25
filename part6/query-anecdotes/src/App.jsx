import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import { getAnecdotes, updateAnecdote } from './requests'
import Notifications from './components/Notifications'
import { NotifyContext } from './notifyContext'
import { useContext } from 'react'

const App = () => {
  const queryClient = useQueryClient()
  const [_, dispatch] = useContext(NotifyContext)

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch('VOTE', `You voted for: ${anecdote.content}`)
  }

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <div>Anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notifications />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
