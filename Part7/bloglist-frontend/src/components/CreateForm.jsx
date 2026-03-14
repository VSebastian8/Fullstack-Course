import { useDispatch } from "react-redux";
import { appendBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useField } from "../hooks";
import Field from "./Field";
import NiceForm from "./NiceForm";
import NiceButton from "./NiceButton";

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
      <h2>Create new blog</h2>
      <NiceForm onSubmit={handleCreate}>
        <Field field={title} />
        <Field field={author} />
        <Field field={url} />
        <NiceButton type="submit">create</NiceButton>
      </NiceForm>
    </div>
  );
};
export default CreateForm;
