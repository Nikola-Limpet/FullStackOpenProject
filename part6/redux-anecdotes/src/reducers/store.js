import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
// use HOC to retunr new obj with id and vote by passing it to content of the note
const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    voteFor(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote => 
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )},
      addNew(state, action) {
        state.push(action.payload)
      },
      setAnecdotes(state, action) {
        return action.payload
      }
    }
  })
const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    searchValue(state, action) {
      return action.payload
    }
  }
})


export const { voteFor, setAnecdotes, addNew } = anecdoteSlice.actions
export const anecdoteReducer = anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
     const anecdotes = await anecdoteService.getAll()
     dispatch(setAnecdotes(anecdotes))
  }
}
export const addNewAnec = (content) => {
  return async dispatch => {
    const newContent = await anecdoteService.createNew(content) 
    dispatch(addNew(newContent))
  }
}
export const vote = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVote(id)
    dispatch(voteFor(updatedAnecdote))
  }
}

export const { searchValue } = filterSlice.actions
export const filterReducer = filterSlice.reducer