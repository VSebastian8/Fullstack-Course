import styled from "styled-components";

const FieldInput = styled.input`
  border-width: 1px;
  border-color: darkblue;
  margin-left: 10px;
  &:focus {
    border-width: 3px;
  }
`;

const Field = ({ field }) => (
  <div>
    <label>
      {field.name}
      <FieldInput {...field.input} />
    </label>
  </div>
);

export default Field;
