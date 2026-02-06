import { useState, useEffect } from "react";
import Countries from "../../data-for-countries/src/components/Countries";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [singleCountry, setSingleCountry] = useState(null);

  const updateQuery = (event) => {
    setQuery(event.target.value);
    setSingleCountry(null);
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setAllCountries(response.data);
      });
  }, []);

  if (allCountries.length === 0) return <div>No data yet</div>;
  return (
    <div>
      find countries <input value={query} onChange={updateQuery}></input>
      <Countries
        query={query}
        singleCountry={singleCountry}
        setSingleCountry={setSingleCountry}
        allCountries={allCountries}
      />
    </div>
  );
};

export default App;
