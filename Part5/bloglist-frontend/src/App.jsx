import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs,  setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false)
  const blogFormRef = useRef()

  useEffect( () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const newNotification = (message, err) => {
    setNotification(message)
    setIsError(err)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
    newNotification('logged out successfully', false)
  }

  const createBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      newNotification('blog created successfully', false)
      return true
    } catch(e) {
      newNotification(e.response.data.error, true)
      return false
    }
  }

  if (user === null) {
    return <div>
      <Notification message={notification} isError={isError} />
      <LoginForm setUser={setUser} newNotification={newNotification}/>
    </div>

  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification message={notification} isError={isError} />
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <Togglable ref={blogFormRef} buttonLabel="create blog">
          <CreateForm createBlog={createBlog} blogFormRef={blogFormRef}/>
        </Togglable>
        <p/>
        <Blogs user={user} blogs={blogs} setBlogs={setBlogs} newNotification={newNotification}/>
      </div>
    )}
}

export default App