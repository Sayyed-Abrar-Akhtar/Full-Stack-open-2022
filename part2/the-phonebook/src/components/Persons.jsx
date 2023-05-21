import React from 'react';

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name}&nbsp;{person.number}&nbsp;&nbsp;
          <button onClick={() => onDelete(person)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
