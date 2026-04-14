const { GraphQLError } = require("graphql");
const Author = require("./models/author");
const Book = require("./models/book");

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let searchOptions = {};
      if (args.author)
        searchOptions.author = await Author.findOne({ name: args.author });
      if (args.genre) searchOptions.genres = args.genre;
      return Book.find(searchOptions);
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      return (await Book.find({ author: root })).length;
    },
    books: async (root) => {
      return Book.find({ author: root });
    },
  },
  Book: {
    author: async ({ author }) => {
      return Author.findById(author);
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      // Find author (or add it if new)
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError(`Adding new author failed: ${error.message}`, {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }
      // Save book
      const book = new Book({ ...args, author: author });
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
      return book;
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      author.born = args.setBornTo;
      return author.save();
    },
  },
};

module.exports = resolvers;
