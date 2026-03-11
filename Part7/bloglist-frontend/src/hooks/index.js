import { useState } from "react";

export const useField = (type, name) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const input = {
    type,
    value,
    onChange,
  };

  const reset = () => {
    setValue("");
  };
  return {
    input,
    value,
    name,
    reset,
  };
};
