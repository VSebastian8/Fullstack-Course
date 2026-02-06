import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import Numbers from "./components/Persons";
import PhoneForm from "./components/PhoneForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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
