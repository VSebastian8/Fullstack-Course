import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      try {
        dispatch(removeBlog(blog));
        dispatch(setNotification("deleted blog successfully", false));
        navigate("/");
      } catch (e) {
        dispatch(setNotification(e.response.data.error, true));
      }
    }
  };

  if (!blog) return <p>loading blog...</p>;

  return (
    <div className="blog">
      <h2>
        {blog.title} - {blog.author}
      </h2>
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
    </div>
  );
};

export default Blog;
