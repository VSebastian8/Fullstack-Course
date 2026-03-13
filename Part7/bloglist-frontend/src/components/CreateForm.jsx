import { useDispatch } from "react-redux";
import { appendBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useField } from "../hooks";
import Field from "./Field";
import styled from "styled-components";

const NiceForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const CreateButton = styled.button`
  cursor: pointer;
  padding: 5px;
  background-color: cornflowerblue;
  color: white;
  font-size: medium;
  border-color: cornflowerblue;
  border-radius: 10%;
  &:hover {
    filter: brightness(0.85);
  }
`;

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
      <NiceForm onSubmit={handleCreate}>
        <Field field={title} />
        <Field field={author} />
        <Field field={url} />
        <CreateButton type="submit">create</CreateButton>
      </NiceForm>
    </div>
  );
};
export default CreateForm;
