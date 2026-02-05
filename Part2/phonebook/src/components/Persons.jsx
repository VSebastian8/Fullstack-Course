const Persons = ({ persons, searchString }) => {
  const shownPersons = persons.filter((p) =>
    p.name.toUpperCase().includes(searchString.toUpperCase()),
  );
  return (
    <>
      <h3>Numbers</h3>
      {shownPersons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </>
  );
};

export default Persons;
