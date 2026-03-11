import Blog from "./Blog";
import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const Blogs = ({ blogs, setBlogs, user }) => {
  const dispatch = useDispatch();

  const updateBlog = async (updatedBlog) => {
    await blogService.update(updatedBlog.id, { likes: updatedBlog.likes }); // backend only updates likes
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
    );
  };

  const deleteBlog = async (deletedBlogId) => {
    try {
      await blogService.deleteBlog(deletedBlogId);
      setBlogs(blogs.filter((blog) => blog.id !== deletedBlogId));
      dispatch(setNotification("deleted blog successfully", false));
    } catch (e) {
      dispatch(setNotification(e.response.data.error, true));
    }
  };

  return (
    <div>
      {blogs
        .sort((b1, b2) => b2.likes - b1.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
    </div>
  );
};

export default Blogs;
