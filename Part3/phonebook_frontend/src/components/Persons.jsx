import personService from "../services/persons";

const Persons = ({ persons, setPersons, searchString, newNotification }) => {
  const shownPersons = persons.filter((p) =>
    p.name.toUpperCase().includes(searchString.toUpperCase()),
  );
  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`))
      personService
        .deletePerson(person.id)
        .then((_) => {
          setPersons(persons.filter((p) => p.id !== person.id));
          newNotification(
            `Person ${person.name} has been successfully deleted from the server.`,
            false,
          );
        })
        .catch((_error) => {
          newNotification(
            `Person ${person.name} has already deleted from the server.`,
            true,
          );
          setPersons(persons.filter((p) => p.id !== person.id));
        });
  };

  return (
    <>
      <h3>Numbers</h3>
      {shownPersons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => deletePerson(person)}>delete</button>
        </li>
      ))}
    </>
  );
};

export default Persons;
