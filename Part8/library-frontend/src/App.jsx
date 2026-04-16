import { useState } from "react";
import {
  useApolloClient,
  useQuery,
  useSubscription,
} from "@apollo/client/react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import { USER_GENRE, BOOK_ADDED } from "./queries";
import { addBookToCache } from "./utils/apolloCache";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token"),
  );
  const client = useApolloClient();
  const { data, loading, refetch } = useQuery(USER_GENRE);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      console.log(`${addedBook.title} added`);
      addBookToCache(client.cache, addedBook);
    },
  });

  const onLogout = () => {
    setToken(null);
    if (page === "add" || page === "recommend") {
      setPage("authors");
    }
    localStorage.clear();
    client.resetStore();
  };

  const user = loading ? null : data.me;

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={onLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendations show={page == "recommend"} user={user} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
        refetchUser={refetch}
      />
    </div>
  );
};

export default App;
