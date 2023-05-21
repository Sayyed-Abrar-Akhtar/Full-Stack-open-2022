import React, { useState } from 'react';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import { useEffect } from 'react';
import { deletePerson, getAllPersons } from './services/persons';

function App() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const eventHandler = (response) => {
      setPersons(response);
    };

    const promise = getAllPersons();

    promise.then(eventHandler);
  }, []);

  const handlePersonUpdate = (newPerson) => {
    //console.log(newPerson);
    setPersons(persons.concat(newPerson));
  };

  const handlePersonDelete = (person) => {
    const isConfirmed = window.confirm(`Delete ${person.name}?`);
    const eventHandler = (response) => {
      console.log(response);
    };
    if (isConfirmed) {
      deletePerson(person.id).then(eventHandler);
      getAllPersons().then((response) => setPersons(response));
    }
  };

  const handleSearchResult = (results) => setPersons(results);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onSearch={handleSearchResult} persons={persons} />

      <h2>Add new entry in the Phonebook</h2>
      <PersonForm onPersonAdd={handlePersonUpdate} persons={persons} />
      <h2>Numbers</h2>
      <Persons persons={persons} onDelete={handlePersonDelete} />
    </div>
  );
}

export default App;
