import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import { NotifyContext } from '../notifyContext'


const AnecdoteForm = () => {

  const [message, dispatch] = useContext(NotifyContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch('CREATE', `Anecdote created: ${newAnecdote.content}`)
    },
    onError: (error) => {
      dispatch('ERROR', `An error occurred: ${error}`)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content === '' || content.length < 5) {
      dispatch('SHORT', 'Anecdote content must be at least 5 character or more')
      return
    }
    newAnecdoteMutation.mutate({ content, votes: 0 })
    event.target.anecdote.value = ''
  }


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
