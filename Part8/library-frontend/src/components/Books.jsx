import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import { useState } from "react";

const Books = ({ show }) => {
  const [selectedGenre, setGenre] = useState(undefined);
  const genresQuery = useQuery(ALL_GENRES);
  const booksQuery = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
    fetchPolicy: "no-cache",
  });

  if (!show) {
    return null;
  }
  if (booksQuery.loading) {
    return <div>loading...</div>;
  }

  const books = booksQuery.data.allBooks;
  const genres = [
    ...new Set((genresQuery.data.allBooks ?? []).flatMap((b) => b.genres)),
  ];

  return (
    <div>
      <h2>books {selectedGenre ? `in genre ${selectedGenre}` : ""}</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((genre) => (
        <button
          key={`genre-${genre}`}
          onClick={() => setGenre(genre)}
          style={{ borderWidth: genre === selectedGenre ? "4px" : "1px" }}
        >
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre(undefined)}>x</button>
    </div>
  );
};

export default Books;
