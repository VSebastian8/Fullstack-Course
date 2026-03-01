import Blog from './Blog'

const Blogs = ({ blogs, setBlogs, newNotification }) => {
  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map(
      blog => blog.id === updatedBlog.id
        ? updatedBlog
        : blog
    ))
  }

  const deleteBlog = (deletedBlogId) => {
    setBlogs(blogs.filter(blog => blog.id !== deletedBlogId))
  }

  return <div>
    {blogs.sort((b1, b2) => b1.likes < b2.likes).map(blog =>
      <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} newNotification={newNotification}/>
    )}
  </div>
}

export default Blogs