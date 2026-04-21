import { useState, useEffect } from "react";
import {
  Visibility,
  Weather,
  type DiaryEntry,
  type NewDiaryEntry,
} from "./types";
import diaryService from "./diaryService";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newVisibility, setNewVisibility] = useState<Visibility>("good");
  const [newWeather, setNewWeather] = useState<Weather>("sunny");
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    diaryService.getAll().then((initialEntries) => {
      setEntries(initialEntries);
    });
  }, []);

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entry: NewDiaryEntry = {
      date: newDate,
      visibility: newVisibility,
      weather: newWeather,
      comment: newComment,
    };
    diaryService
      .create(entry)
      .then((returnedEntry) => {
        setEntries(entries.concat(returnedEntry));
        setNewDate("");
        setNewVisibility("good");
        setNewWeather("sunny");
        setNewComment("");
      })
      .catch((e) => {
        if (e?.response?.data) {
          const message = e.response.data.error[0].message;
          console.error(message);
          alert(message);
        } else {
          alert("Unrecognized axios error");
        }
      });
  };

  const changeVisibility = (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setNewVisibility(event.target.value as Visibility);
  };

  const changeWeather = (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setNewWeather(event.target.value as Weather);
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={entryCreation}>
        <div>
          date:
          <input
            type="date"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
        </div>
        <div>
          visibility:
          <label>
            <input
              type="radio"
              value="great"
              checked={newVisibility === "great"}
              onChange={changeVisibility}
            />
            great
          </label>
          <label>
            <input
              type="radio"
              value="good"
              checked={newVisibility === "good"}
              onChange={changeVisibility}
            />
            good
          </label>
          <label>
            <input
              type="radio"
              value="ok"
              checked={newVisibility === "ok"}
              onChange={changeVisibility}
            />
            ok
          </label>
          <label>
            <input
              type="radio"
              value="poor"
              checked={newVisibility === "poor"}
              onChange={changeVisibility}
            />
            poor
          </label>
        </div>
        <div>
          weather:
          <label>
            <input
              type="radio"
              value="sunny"
              checked={newWeather === "sunny"}
              onChange={changeWeather}
            />
            sunny
          </label>
          <label>
            <input
              type="radio"
              value="rainy"
              checked={newWeather === "rainy"}
              onChange={changeWeather}
            />
            rainy
          </label>
          <label>
            <input
              type="radio"
              value="cloudy"
              checked={newWeather === "cloudy"}
              onChange={changeWeather}
            />
            cloudy
          </label>
          <label>
            <input
              type="radio"
              value="stormy"
              checked={newWeather === "stormy"}
              onChange={changeWeather}
            />
            stormy
          </label>
          <label>
            <input
              type="radio"
              value="windy"
              checked={newWeather === "windy"}
              onChange={changeWeather}
            />
            windy
          </label>
        </div>
        <div>
          comment:
          <input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary Entries</h2>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h4>{entry.date}</h4>
          <p>visibility: {entry.visibility}</p>
          <p>weather: {entry.weather}</p>
        </div>
      ))}
    </>
  );
};

export default App;
