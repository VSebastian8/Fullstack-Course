import { useState } from "react";
import SearchFilter from "./components/SearchFilter";
import Numbers from "./components/Persons";
import PhoneForm from "./components/PhoneForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [searchString, setSearchString] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <PhoneForm persons={persons} setPersons={setPersons} />
      <Numbers persons={persons} searchString={searchString} />
    </div>
  );
};

export default App;
