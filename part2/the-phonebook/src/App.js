import { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([{ id: 1, name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const results = persons.filter((person) => person.name === newName);
    if (results.length) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
    } else {
      const newPerson = {
        id: persons.length + 1,
        name: newName,
      };

      setPersons(persons.concat(newPerson));
      setNewName('');
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>{person.name}</p>
      ))}
    </div>
  );
}

export default App;
