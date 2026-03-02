import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ blogs, setBlogs, newNotification }) => {
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
    {blogs.sort((b1, b2) => b1.likes < b2.likes).map(blog =>
      <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
    )}
  </div>
}

export default Blogs