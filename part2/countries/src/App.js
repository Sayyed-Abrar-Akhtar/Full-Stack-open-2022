import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Country from './components/Country';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const eventHandler = (response) => {
      setCountries(response.data);
    };

    const promise = axios.get(
      'https://studies.cs.helsinki.fi/restcountries/api/all',
      {
        method: 'GET',
        mode: 'no-cors',
      }
    );

    promise.then(eventHandler);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredCountries = countries
      .filter(
        (country) =>
          country.name.common
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) && e.target.value
      )
      .map((item) => ({
        name: item?.name?.common,
        capitals: item?.capital,
        area: item?.area,
        languages: item?.languages,
        flag: item?.flag,
      }));
    console.log(filteredCountries);
    setFilteredCountries(filteredCountries);
  };

  return (
    <div>
      {countries.length ? (
        <div>
          <div>
            <label htmlFor='search-countries'>find countries</label>&nbsp;&nbsp;
            <input
              type='search'
              name='search'
              id='search-countries'
              value={searchTerm}
              onChange={handleSearch}
              placeholder='Search...'
            />
          </div>
          {filteredCountries.length === 1 ? (
            <Country country={filteredCountries[0]} />
          ) : filteredCountries.length > 10 ? (
            <p>
              <strong>Too many matches, specify another filter</strong>
            </p>
          ) : (
            <ul>
              {filteredCountries.map((country) => (
                <li key={country.name}>{country.name}</li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p>loading countries...</p>
      )}
    </div>
  );
}

export default App;
