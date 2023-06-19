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
        id: item?.cca2,
        name: item?.name?.common,
        capitals: item?.capital,
        area: item?.area,
        languages: item?.languages,
        flag: item?.flag,
        lat: item?.latlng[0],
        lon: item?.latlng[1],
      }));
    console.log(filteredCountries);
    setFilteredCountries(filteredCountries);
  };

  const handleClick = (e, id) => {
    const updatedCountryObj = filteredCountries.map((country) => {
      if (country.id === id) {
        return { ...country, show: true };
      }
      return { ...country, show: false };
    });
    setFilteredCountries(updatedCountryObj);
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
            <div>
              {filteredCountries.map((country) =>
                country.show ? (
                  <Country country={country} />
                ) : (
                  <div
                    key={country.id}
                    style={{ listStyleType: 'none', margin: '15px 0' }}
                  >
                    {country.name} &nbsp;
                    <button onClick={(e) => handleClick(e, country.id)}>
                      show
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      ) : (
        <p>loading countries...</p>
      )}
    </div>
  );
}

export default App;
