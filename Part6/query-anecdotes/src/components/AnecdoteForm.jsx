import { createNew } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(`added anecdote '${res.content}'`)
    },
    onError: (err) => {
      setNotification(err.message)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
