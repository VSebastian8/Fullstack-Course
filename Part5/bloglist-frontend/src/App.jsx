import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs,  setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false)

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
        <p>{user.username} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <CreateForm blogs={blogs} setBlogs={setBlogs} newNotification={newNotification}/>
        <p/>
        <Blogs blogs={blogs}/>
      </div>
    )}
}

export default App