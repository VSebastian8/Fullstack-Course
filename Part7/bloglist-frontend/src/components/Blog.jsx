import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog, commentBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useNavigate, Link } from "react-router-dom";
import { useField } from "../hooks";
import Field from "./Field";
import NiceButton from "./NiceButton";
import NiceForm from "./NiceForm";
import styled from "styled-components";

const BlogTitle = styled.h2`
  background-color: cornflowerblue;
  color: white;
  text-align: center;
`;

const BlogElement = styled.div`
  padding: 10px;
  border-bottom: 1px solid lightblue;
  color: darkblue;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  border: 2px solid cornflowerblue;
  margin-top: 15px;
`;

const Comment = styled.li`
  padding: 10px;
  border-bottom: 1px solid lightblue;
  color: darkblue;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f0f5ff;
  }
`;

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
    if (comment.value !== "") {
      dispatch(commentBlog(blog, comment.value));
      comment.reset();
    }
  };

  if (!blog) return <p>loading blog...</p>;
  return (
    <div className="blog">
      <BlogTitle>
        {blog.title} - {blog.author}
      </BlogTitle>
      <BlogElement>{blog.url}</BlogElement>
      <BlogElement>
        likes {blog.likes} <NiceButton onClick={handleLike}>like</NiceButton>
      </BlogElement>
      <BlogElement>
        <Link to={`../users/${blog.user.id}`}>{blog.user.name}</Link>
      </BlogElement>

      {user && blog.user.username === user.username ? (
        <>
          <br />
          <NiceButton onClick={handleRemove}>remove</NiceButton>
        </>
      ) : (
        <></>
      )}
      <h3>comments</h3>
      <NiceForm onSubmit={handleComment}>
        <Field field={comment} />
        <NiceButton type="submit">add comment</NiceButton>
      </NiceForm>
      <CommentList>
        {blog.comments.map((comment) => (
          <Comment key={"comment-" + blog.id + comment}>{comment}</Comment>
        ))}
      </CommentList>
    </div>
  );
};

export default Blog;
