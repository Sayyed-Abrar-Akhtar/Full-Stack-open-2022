const express = require('express');

const app = express();
app.use(express.json());
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
  console.log(req);
  const person = req.body;
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
