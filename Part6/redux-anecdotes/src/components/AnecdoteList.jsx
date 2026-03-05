import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify, clear } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if(state.filter === '')
      return state.anecdotes
    return state.anecdotes.filter(ac => ac.content.toUpperCase().includes(state.filter.toUpperCase()))
  })

  const dispatch = useDispatch()
  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(notify(`You voted for ${content}`))
    setTimeout(() => dispatch(clear(`You voted for ${content}`)), 5000)
  }

  return <>
    {anecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    ))}
  </>
}

export default AnecdoteList