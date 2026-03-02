import { useState } from 'react'

const CreateForm = ({ createBlog, blogFormRef }) => {
  const[title, setTitle] = useState('')
  const[author, setAuthor] = useState('')
  const[url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    if(await createBlog({ title, author, url })) {
      // Blog creation succeded
      setTitle('')
      setAuthor('')
      setUrl('')
      blogFormRef.current.toggleVisibility()
    }
  }

  return <div>
    <h2>create new blog</h2>
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