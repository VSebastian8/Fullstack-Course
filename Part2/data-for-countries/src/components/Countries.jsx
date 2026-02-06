import { useState } from "react";
import Country from "./Country";

const Countries = ({
  query,
  allCountries,
  singleCountry,
  setSingleCountry,
}) => {
  if (singleCountry)
    return (
      <Country
        country={allCountries.filter((c) => c.name.common === singleCountry)[0]}
      />
    );

  const shownCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase()),
  );

  if (query === "") return <></>;
  if (shownCountries.length === 0) return <p>No countries found</p>;
  if (shownCountries.length > 10)
    return <p>Too many matches, specify another filter</p>;
  if (shownCountries.length > 1)
    return (
      <>
        {shownCountries.map((country) => (
          <li key={country.name.common}>
            {country.name.common}
            <button onClick={() => setSingleCountry(country.name.common)}>
              Show
            </button>
          </li>
        ))}
      </>
    );
  return <Country country={shownCountries[0]} />;
};

export default Countries;
