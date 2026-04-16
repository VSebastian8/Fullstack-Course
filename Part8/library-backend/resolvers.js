const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const pubsub = new PubSub();

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
    me: (root, args, context) => context.currentUser,
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
    addBook: async (root, args, { currentUser }) => {
      // Only possible with valid token
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }
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

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, { currentUser }) => {
      // Only possible with valid token
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }
      // Edit author birth year
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      return author.save();
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError(`Creating the user failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
