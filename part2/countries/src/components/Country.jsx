import React from 'react';

function Country({ country }) {
  return (
    <div>
      <h1>{country?.name}</h1>
      <p>
        capital:&nbsp;
        {country?.capitals?.map((capital, index) =>
          index === country?.capitals?.length - 1
            ? `${capital}.`
            : `${capital}, `
        )}
      </p>
      <p>area:&nbsp;{country?.area}</p>
      <div>
        <p>
          <strong>languages:</strong>
        </p>
        <ul>
          {Object.values(country?.languages)?.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      </div>
      <div style={{ fontSize: '200px' }}>{country?.flag}</div>
    </div>
  );
}

export default Country;
