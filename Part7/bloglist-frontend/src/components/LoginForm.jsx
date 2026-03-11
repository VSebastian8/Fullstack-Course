import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";
import { useField } from "../hooks";
import Field from "./Field";

const LoginForm = () => {
  const username = useField("text", "username");
  const password = useField("password", "password");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser(username.value, password.value));
      username.reset();
      password.reset();
      dispatch(setNotification("logged in successfully", false));
    } catch {
      dispatch(setNotification("wrong username or password", true));
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <Field field={username} />
        <Field field={password} />
        <button type="submit">login</button>
      </form>
    </div>
  );
};
export default LoginForm;
