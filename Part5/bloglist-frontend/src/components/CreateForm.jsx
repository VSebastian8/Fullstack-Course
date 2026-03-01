import { useState } from 'react'
import blogService from '../services/blogs'

const CreateForm = ({ blogs, setBlogs, newNotification }) => {
  const[title, setTitle] = useState('')
  const[author, setAuthor] = useState('')
  const[url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title, author, url
      })
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      newNotification('blog created successfully', false)
    } catch(e) {
      newNotification(e.response.data.error, true)
    }
  }

  return <div>
    <h2>create new</h2>
    <form onSubmit={ handleCreate }>
      <div>
        <label>
          title
          <input
            type="text"
            value={ title }
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            type="text"
            value={ author }
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            type="text"
            value={ url }
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  </div>
}
export default CreateForm