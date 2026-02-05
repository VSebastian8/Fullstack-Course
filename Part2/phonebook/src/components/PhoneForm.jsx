import { useState } from "react";

const PhoneForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const changeName = (event) => {
    setNewName(event.target.value);
  };
  const changeNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    if (newName === "") return;
    if (persons.find((p) => p.name === newName) === undefined) {
      setPersons(
        persons.concat({
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        }),
      );
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <>
      <h3>Add new person to the Phonebook</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={changeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={changeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PhoneForm;
