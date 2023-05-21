import { useState } from 'react';
import { createNewPerson } from '../services/persons';

const PersonForm = ({ onPersonAdd, onPersonEdit, onSuccess, persons }) => {
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
      alert(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      onPersonEdit({ ...results[0], number: newNumber });
      setNewName('');
      setNewNumber('');
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      const eventHandler = (response) => {
        onPersonAdd(response);
        onSuccess(response);
      };
      createNewPerson(newPerson).then(eventHandler);

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
