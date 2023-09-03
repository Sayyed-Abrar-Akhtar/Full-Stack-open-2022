require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Phonebook = require('./models/phonebook');

const app = express();
//console.log(process.argv[2]);
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
  Phonebook.find({})
    .then((record) => {
      if (record) {
        response.json(record);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      // 400 Bad request
      response.status(400).send({ status: 'fail', data: { error } });
    });
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
  try {
    Phonebook.findById(request.params.id).then((record) => {
      response.json(record);
    });
  } catch (error) {
    response.status(404).json({ status: 'fail', error });
  }
  const id = Number(request.params.id);
});

app.post('/api/persons/', (req, res) => {
  const { name, number } = req.body;
  //const checkName = data.find((item) => item.name === person.name);
  // if (checkName) {
  //   return res.status(400).json({
  //     error: 'Person Name must be unique',
  //   });
  // }
  if (name.length < 1 || number.length < 1) {
    return res.status(400).json({
      error: 'The name or number is missing!',
    });
  }
  const record = new Phonebook({
    name,
    number,
  });

  record.save().then((person) => {
    //console.log(`added ${result.name} number ${result.number} to phonebook`);
    res.json(person);
  });
});

app.delete('/api/persons/:id', (req, res, next) => {
  Phonebook.findByIdAndDelete(req.params.id)
    .then((result) => {
      //console.log(result);
      res.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ error: 'malformatted id' });
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
