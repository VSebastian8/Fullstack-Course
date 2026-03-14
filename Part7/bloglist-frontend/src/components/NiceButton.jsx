import styled from "styled-components";

const NiceButton = styled.button`
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

export default NiceButton;
