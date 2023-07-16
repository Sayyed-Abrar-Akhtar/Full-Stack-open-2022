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
  response.send('<h1>Welcome to the phonebook backend.</h1>');
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
