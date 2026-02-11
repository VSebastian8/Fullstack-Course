import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import Numbers from "./components/Persons";
import PhoneForm from "./components/PhoneForm";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [notification, setNotification] = useState(null);
  const [isError, setIsError] = useState(false);

  const newNotification = (message, err) => {
    setNotification(message);
    setIsError(err);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    personService.getAll().then((allPersons) => {
      setPersons(allPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} isError={isError} />
      <SearchFilter
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <PhoneForm
        persons={persons}
        setPersons={setPersons}
        newNotification={newNotification}
      />
      <Numbers
        persons={persons}
        setPersons={setPersons}
        searchString={searchString}
        newNotification={newNotification}
      />
    </div>
  );
};

export default App;
