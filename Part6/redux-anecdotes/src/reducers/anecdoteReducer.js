import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(
        anecdote => anecdote.id === updatedAnecdote.id
          ? updatedAnecdote
          : anecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { createAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateAnecdote({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
