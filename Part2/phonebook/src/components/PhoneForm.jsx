import { useState } from "react";
import personService from "../services/persons";

const PhoneForm = ({ persons, setPersons, newNotification }) => {
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
    if (newName === "" || newNumber === "") return;
    let existingPerson = persons.find((p) => p.name === newName);
    if (existingPerson === undefined) {
      personService
        .addPerson({ name: newName, number: newNumber })
        .then((person) => {
          setPersons(persons.concat(person));
          setNewName("");
          setNewNumber("");
          newNotification(`Added ${person.name}.`, false);
        });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        personService
          .updatePerson(existingPerson, newNumber)
          .then((person) => {
            setPersons(
              persons.map((p) => (p.name === person.name ? person : p)),
            );
            setNewName("");
            setNewNumber("");
            newNotification(`Modified number for ${person.name}.`, false);
          })
          .catch((_error) => {
            newNotification(
              `Person ${existingPerson.name}  has already deleted from the server.`,
              true,
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
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
