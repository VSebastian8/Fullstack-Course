import { useSelector } from "react-redux";
import styled from "styled-components";

const NotifDiv = styled.div`
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  color: ${(props) => (props.$isError ? "red" : "green")};
`;

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification === null) {
    return null;
  }
  const { message, isError } = notification;

  return <NotifDiv $isError={isError}>{message}</NotifDiv>;
};

export default Notification;
