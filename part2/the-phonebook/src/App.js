import { useState } from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import { useEffect } from 'react';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  useEffect(() => {
    const eventHandler = (response) => {
      setPersons(response.data);
    };

    const promise = axios.get('http://localhost:3001/persons');
    promise.then(eventHandler);
  }, []);

  const handlePersonUpdate = (newPerson) => {
    setPersons(persons.concat(newPerson));
  };

  const handleSearchResult = (results) => setPersons(results);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onSearch={handleSearchResult} persons={persons} />

      <h2>Add new entry in the Phonebook</h2>
      <PersonForm onPersonAdd={handlePersonUpdate} persons={persons} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
}

export default App;
