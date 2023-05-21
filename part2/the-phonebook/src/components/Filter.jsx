import React from 'react';
import { useState } from 'react';

const Filter = ({ onSearch, persons }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const results = persons.filter((person) =>
      person.name.toLowerCase().includes(search)
    );

    if (results.length) {
      onSearch(results);
    }
  };
  return (
    <form onSubmit={handleSearch}>
      <div>
        Filter shown with:&nbsp;
        <input
          type='text'
          name='search'
          value={search}
          onChange={handleSearchChange}
        />
      </div>
    </form>
  );
};

export default Filter;
