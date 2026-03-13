import { useState, useImperativeHandle } from "react";
import styled from "styled-components";

const ToggleButton = styled.button`
  background-color: lightblue;
  cursor: pointer;
  color: darkblue;
  border-radius: 10%;
  border-width: 2px;
  padding: 5px;
`;

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <ToggleButton onClick={toggleVisibility}>
          {props.buttonLabel}
        </ToggleButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <ToggleButton onClick={toggleVisibility}>cancel</ToggleButton>
      </div>
    </div>
  );
};

export default Togglable;
