import { useState } from "react";
import { useDispatch } from "react-redux";
import { appendBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const CreateForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      await dispatch(appendBlog({ title, author, url }));
      // Blog creation succeded
      dispatch(setNotification("blog created successfully", false));
      setTitle("");
      setAuthor("");
      setUrl("");
      blogFormRef.current.toggleVisibility();
    } catch (e) {
      dispatch(setNotification(e.response.data.error, true));
    }
  };

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>
            title
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};
export default CreateForm;
