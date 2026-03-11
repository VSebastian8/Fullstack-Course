import { useDispatch } from "react-redux";
import { appendBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useField } from "../hooks";
import Field from "./Field";

const CreateForm = ({ blogFormRef }) => {
  const title = useField("text", "title");
  const author = useField("text", "author");
  const url = useField("text", "url");
  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      await dispatch(
        appendBlog({
          title: title.value,
          author: author.value,
          url: url.value,
        }),
      );
      // Blog creation succeded
      dispatch(setNotification("blog created successfully", false));
      title.reset();
      author.reset();
      url.reset();
      blogFormRef.current.toggleVisibility();
    } catch (e) {
      dispatch(setNotification(e.response.data.error, true));
    }
  };

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleCreate}>
        <Field field={title} />
        <Field field={author} />
        <Field field={url} />
        <button type="submit">create</button>
      </form>
    </div>
  );
};
export default CreateForm;
