import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, deleteBlog, newNotification }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    blogService.update(blog.id, { likes: blog.likes + 1 }) // backend only updates likes
    updateBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleRemove = async () => {
    try {
      if(window.confirm(`Remove blog ${blog.title}`)){
        await blogService.deleteBlog(blog.id)
        deleteBlog(blog.id)
        newNotification('deleted blog successfully', false)
      }
    }
    catch (e) {
      newNotification(e.response.data.error, true)
    }
  }

  const fullBlog = () => (
    <>
      <div>
        {blog.url}
      </div>
      <div>
        likes {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>
        {blog.author}
      </div>
      <button onClick={handleRemove}>remove</button>
    </>
  )

  return(
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
        {visible && fullBlog()}
      </div>
    </div>
  )
}

export default Blog