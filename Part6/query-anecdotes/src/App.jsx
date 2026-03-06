import { useQuery } from '@tanstack/react-query'
import { getAll } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Anecdote from './components/Anecdote'

const App = () => {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1
  })

  if(result.isLoading)
    return <div>loading anecdotes...</div>
  if(result.isError)
    return <div>anecdote service is not available due to problems in server</div>

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.toSorted((a1, a2) => a2.votes - a1.votes).map((anecdote) => (
        <Anecdote anecdote={anecdote} key={anecdote.id}/>
      ))}
    </div>
  )
}

export default App
