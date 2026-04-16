GraphQL Library

- [x] Backend (8.1-8.7)
- [x] Frontend (8.8-8.12)
- [x] Database (8.13-8.16)
- [x] User Administration (8.17-8.22)
- [x] Caching (8.23-8.26)

Demo user: root
Password: secret

I solved the n + 1 problem by adding a field books to the Author model, thus the bookCount resolver does not need to query the database anymore. The addBook resolver changed slightly in order to add the new book to the author's books array.
