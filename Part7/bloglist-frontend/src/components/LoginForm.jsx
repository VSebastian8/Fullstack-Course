import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";
import { useField } from "../hooks";
import { useNavigate } from "react-router-dom";
import Field from "./Field";
import NiceForm from "./NiceForm";
import NiceButton from "./NiceButton";

const LoginForm = () => {
  const username = useField("text", "username");
  const password = useField("password", "password");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser(username.value, password.value));
      username.reset();
      password.reset();
      dispatch(setNotification("logged in successfully", false));
      navigate("/");
    } catch {
      dispatch(setNotification("wrong username or password", true));
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <NiceForm onSubmit={handleLogin}>
        <Field field={username} />
        <Field field={password} />
        <NiceButton type="submit">login</NiceButton>
      </NiceForm>
    </div>
  );
};
export default LoginForm;
