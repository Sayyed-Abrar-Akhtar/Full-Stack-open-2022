import React, { useState } from 'react';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import { useEffect } from 'react';
import { deletePerson, getAllPersons, updatePerson } from './services/persons';

function App() {
  const [persons, setPersons] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const eventHandler = (response) => {
      setPersons(response);
    };

    const promise = getAllPersons();

    promise.then(eventHandler);
  }, []);

  const handleSuccess = (person) => {
    setSuccessMessage(`Added ${person.name}`);
    setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
  };

  const handlePersonUpdate = (newPerson) => {
    //console.log(newPerson);
    setPersons(persons.concat(newPerson));
  };

  const handlePersonDelete = (person) => {
    const isConfirmed = window.confirm(`Delete ${person.name}?`);
    const eventHandler = (response) => {
      if (response.status === 404) {
        setErrorMessage(
          `Information of ${person.name} has already removed from server`
        );
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      }
    };
    if (isConfirmed) {
      deletePerson(person.id).then(eventHandler);
      getAllPersons().then((response) => setPersons(response));
    }
  };

  const handlePersonEdit = (person) => {
    const eventHandler = (response) => {
      console.log(response);
    };

    updatePerson(person.id, person).then(eventHandler);
    getAllPersons().then((response) => setPersons(response));
  };

  const handleSearchResult = (results) => setPersons(results);

  return (
    <div>
      <h2>Phonebook</h2>
      {successMessage ? <p className='success'>{successMessage}</p> : null}
      {errorMessage ? <p className='error'>{errorMessage}</p> : null}
      <Filter onSearch={handleSearchResult} persons={persons} />

      <h2>Add new entry in the Phonebook</h2>
      <PersonForm
        onPersonAdd={handlePersonUpdate}
        onPersonEdit={handlePersonEdit}
        onSuccess={handleSuccess}
        persons={persons}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} onDelete={handlePersonDelete} />
    </div>
  );
}

export default App;
