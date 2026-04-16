import { ALL_BOOKS } from "../queries";

export const addBookToCache = (cache, bookToAdd) => {
  // Update the unfiltered query
  cache.updateQuery({ query: ALL_BOOKS }, (data) => {
    if (!data) return data;
    const { allBooks } = data;
    const bookExists = allBooks.some((book) => book.id === bookToAdd.id);
    if (bookExists) return { allBooks };
    return { allBooks: allBooks.concat(bookToAdd) };
  });

  // Update genre-specific cached queries
  bookToAdd.genres.forEach((genre) => {
    cache.updateQuery({ query: ALL_BOOKS, variables: { genre } }, (data) => {
      if (!data) return data;
      const { allBooks } = data;
      const bookExists = allBooks.some((book) => book.id === bookToAdd.id);
      if (bookExists) return { allBooks };
      return { allBooks: allBooks.concat(bookToAdd) };
    });
  });
};
