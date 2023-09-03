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

app.get('/api/persons/', (request, response, next) => {
  Phonebook.find({})
    .then((record) => {
      if (record) {
        response.json(record);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.get('/info/', (request, response, next) => {
  Phonebook.find({})
    .then((result) => {
      const html = `<section>
    <p>Phonebook has info for ${result.length} ${
        result.length > 1 ? 'peoples' : 'people'
      }.</p>
    <p>${new Date()}</p>
    </section>`;
      response.send(html);
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then((record) => {
      response.json(record);
    })
    .catch((error) => next(error));
});

app.post('/api/persons/', (req, res, next) => {
  const { name, number } = req.body;
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

  record
    .save()
    .then((person) => {
      //console.log(`added ${result.name} number ${result.number} to phonebook`);
      res.json(person);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  const record = { name, number };
  Phonebook.findByIdAndUpdate(req.params.id, record, { new: true })
    .then((updatedRecord) => res.json(updatedRecord))
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Phonebook.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(result);
      res.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  console.log('error name:', error.name);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(500).send({
      status: 'fail',
      message:
        `${error.message}` ||
        `Name is shorter than the minimum allowed length (3)`,
    });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
