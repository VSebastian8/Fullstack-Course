import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { EDIT_BIRTH } from "../queries";
import Select from "react-select";

const YearForm = ({ authors }) => {
  const [name, setName] = useState(null);
  const [year, setYear] = useState("");
  const options = authors.map((a) => ({
    value: a.name,
    label: a.name,
  }));

  const [changeYear] = useMutation(EDIT_BIRTH);

  const submit = (event) => {
    event.preventDefault();

    changeYear({ variables: { name: name.value, year: Number(year) } });

    setName("");
    setYear("");
  };

  return (
    <div>
      <h2>set birth year</h2>

      <form onSubmit={submit}>
        <div>
          name
          <Select defaultValue={name} onChange={setName} options={options} />
        </div>
        <div>
          year
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default YearForm;
