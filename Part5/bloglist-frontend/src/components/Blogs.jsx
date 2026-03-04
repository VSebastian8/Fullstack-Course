import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ blogs, setBlogs, newNotification, user }) => {
  const updateBlog = async (updatedBlog) => {
    await blogService.update(updatedBlog.id, { likes: updatedBlog.likes }) // backend only updates likes
    setBlogs(blogs.map(
      blog => blog.id === updatedBlog.id
        ? updatedBlog
        : blog
    ))
  }

  const deleteBlog = async (deletedBlogId) => {
    try {
      await blogService.deleteBlog(deletedBlogId)
      setBlogs(blogs.filter(blog => blog.id !== deletedBlogId))
      newNotification('deleted blog successfully', false)
    }
    catch (e) {
      newNotification(e.response.data.error, true)
    }
  }

  return <div>
    {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
      <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
    )}
  </div>
}

export default Blogs