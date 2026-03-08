import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }
  const input = {
    type,
    value,
    onChange
  }

  return {
    input,
    reset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  // token could be used for servers that need auth
  const [token, changeToken] = useState([])

  const setToken = newToken => {
    changeToken(`bearer ${newToken}`)
  }

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get(baseUrl)
      return response.data
    }

    getAll().then(
      (allResources) => {
        setResources(allResources)
      }
    )
  }, [baseUrl])

  const create = async (resource) => {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, resource, config)
    setResources(resources.concat(response.data))
    return response.data
  }

  const service = {
    create,
    setToken
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    content.reset()
    noteService.create({ content: content.input.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    name.reset()
    number.reset()
    personService.create({ name: name.input.value, number: number.input.value })
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.input} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.input} /> <br/>
        number <input {...number.input} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App