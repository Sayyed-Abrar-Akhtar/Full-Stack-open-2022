const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(
  morgan(function (tokens, req, res) {
    tokens.body = JSON.stringify(req.body);
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.body,
    ].join(' ');
  })
);
app.use(express.static('build'));

let data = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/', (request, response) => {
  response.send(`<h1>Welcome to the phonebook backend.</h1>`);
});

app.get('/api/persons/', (request, response) => {
  response.json(data);
});

app.get('/info/', (request, response) => {
  const html = `<section>
    <p>Phonebook has info for ${data.length} ${
    data.length > 1 ? 'peoples' : 'people'
  }.</p>
  <p>${new Date()}</p>
  </section>`;
  response.send(html);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = data.find((person) => person.id === id);
  if (!person) {
    response.status(404).end();
  }
  response.json(person);
});

app.post('/api/persons/', (req, res) => {
  const id = generateId();
  const person = req.body;
  const checkName = data.find((item) => item.name === person.name);
  if (checkName) {
    return res.status(400).json({
      error: 'Person Name must be unique',
    });
  }
  if (person.name.length < 1 || person.number.length < 1) {
    return res.status(400).json({
      error: 'The name or number is missing!',
    });
  }
  person.id = id;
  data = data.concat(person);
  res.json(person);
});

app.delete('/api/person/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = data.find((person) => person.id === id);
  if (!person) {
    res.status(404).end();
  }
  data = data.filter((person) => person.id !== id);
  res.status(204).end();
});

const generateId = () => {
  return Math.abs(Math.floor(Math.random() * 515454524554584));
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
