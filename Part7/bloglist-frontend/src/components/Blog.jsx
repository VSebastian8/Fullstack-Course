import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 });
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      await deleteBlog(blog.id);
    }
  };

  const fullBlog = () => (
    <>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>{blog.user.name}</div>
      {user && blog.user.username === user.username ? (
        <button onClick={handleRemove}>remove</button>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
        {visible && fullBlog()}
      </div>
    </div>
  );
};

export default Blog;
