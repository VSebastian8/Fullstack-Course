import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";
import { useField } from "../hooks";
import { useNavigate } from "react-router-dom";
import Field from "./Field";
import styled from "styled-components";

const Title = styled.h2`
  display: inline-block;
  background: linear-gradient(135deg, darkblue, cornflowerblue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  justify-self: center;
`;

const NiceForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const LoginButton = styled.button`
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
      <Title>Log in to application</Title>
      <NiceForm onSubmit={handleLogin}>
        <Field field={username} />
        <Field field={password} />
        <LoginButton type="submit">login</LoginButton>
      </NiceForm>
    </div>
  );
};
export default LoginForm;
