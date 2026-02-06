import { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const langs = Object.values(country.languages);
  const weather_api_key = import.meta.env.VITE_WEATHER_KEY;
  const lat = country.latlng[0];
  const lon = country.latlng[1];

  const [temp, setTemp] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}`,
      )
      .then((response) => {
        setTemp((response.data.main.temp - 273.15).toFixed(2));
        setWind(response.data.wind.speed);
        setIcon(
          `https://openweathermap.org/payload/api/media/file/${response.data.weather[0].icon}.png`,
        );
      });
  }, []);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} km^2</p>
      <h3>Languages</h3>
      <ul>
        {langs.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png}></img>
      {temp && wind ? (
        <>
          <h3>Weather</h3>
          <p>Temperature {temp} Celsius</p>
          <img src={icon} alt="weather icon" />
          <p>Wind {wind} m/s</p>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Country;
