import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if(state.filter === '')
      return state.anecdotes
    return state.anecdotes.filter(ac => ac.content.toUpperCase().includes(state.filter.toUpperCase()))
  })

  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 3))
  }

  return <>
    {anecdotes.toSorted((a1, a2) => a2.votes - a1.votes).map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes} votes
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    ))}
  </>
}

export default AnecdoteList