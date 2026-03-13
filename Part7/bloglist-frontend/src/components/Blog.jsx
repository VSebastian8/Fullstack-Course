import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      try {
        dispatch(removeBlog(blog));
        dispatch(setNotification("deleted blog successfully", false));
      } catch (e) {
        dispatch(setNotification(e.response.data.error, true));
      }
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
