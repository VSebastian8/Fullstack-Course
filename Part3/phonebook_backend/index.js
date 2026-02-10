const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const range = 1000000;
  const newId = Math.floor(Math.random() * range);
  while (persons.map((p) => Number(p.id)).includes(newId)) {
    newId = Math.floor(Math.random() * range);
  }
  return String(newId);
};

app.use(cors());
app.use(express.json());
// Log methods other than POST with tiny
app.use(
  morgan("tiny", {
    skip: (req, _res) => {
      return req.method === "POST";
    },
  }),
);
// Log POST with added body token
morgan.token("body", function (req, _res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :res[content-length] :body - :response-time ms",
    {
      skip: (req, _res) => {
        return req.method !== "POST";
      },
    },
  ),
);

app.get("/", (request, response) => {
  response.send("<h1>Phonebook Backend!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

app.get("/info", (request, response) => {
  const len = persons.length;
  const date = new Date();
  response.send(`<p>Phonebook has info for ${len} people</p><p>${date}</p>`);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "name missing" });
  }
  if (!body.number) {
    return response.status(400).json({ error: "number missing" });
  }
  if (persons.map((p) => p.name).includes(body.name)) {
    return response.status(400).json({ error: "name must be unique" });
  }
  person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
