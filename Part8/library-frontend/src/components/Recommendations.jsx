import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";

const Recommendations = ({ show, user }) => {
  const favoriteGenre = (user ?? {}).favoriteGenre;
  const booksQuery = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !user,
  });

  if (!show || !user) return null;
  if (booksQuery.loading) {
    return <div>loading...</div>;
  }

  const books = booksQuery.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>

      <h4>books in your favorite genre {favoriteGenre}</h4>

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
    </div>
  );
};

export default Recommendations;
