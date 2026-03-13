import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog, commentBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";
import Field from "./Field";

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comment = useField("text", "comment");

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

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(commentBlog(blog, comment.value));
    comment.reset();
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
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <Field field={comment} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={"comment-" + blog.id + comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
