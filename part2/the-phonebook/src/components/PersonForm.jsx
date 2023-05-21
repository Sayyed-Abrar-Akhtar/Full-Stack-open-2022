import React, { useState } from 'react';

const PersonForm = ({ onPersonAdd, persons }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const results = persons.filter(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (results.length) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
    } else {
      const newPerson = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      };
      onPersonAdd(newPerson);
      setNewName('');
      setNewNumber('');
    }
  };

  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />{' '}
      </div>
      <br />
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <br />
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
