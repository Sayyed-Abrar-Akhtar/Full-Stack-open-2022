import { useState, useEffect } from 'react';
import axios from 'axios';

function Country({ country }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const eventHandler = (response) => {
      setWeatherData(response.data);
    };

    const promise = axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${country.lat}&lon=${country.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
      {
        method: 'GET',
        mode: 'no-cors',
      }
    );

    promise.then(eventHandler);
  }, [country.lat, country.lon]);

  console.log(weatherData);

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
      <div>
        <p>
          <strong>Weather in {country.capitals[0]}</strong>
        </p>
        <br />
        <p>
          temperature: {weatherData ? weatherData.main.temp : 'loading...'}{' '}
          Celcius
        </p>
        <p>
          feels like: {weatherData ? weatherData.main.feels_like : 'loading...'}{' '}
          Celcius
        </p>
      </div>
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
          alt={
            weatherData
              ? weatherData?.weather[0]?.description
              : 'weather descriptopn'
          }
        />
      </div>
      <div>
        <p>
          wind: {weatherData ? `${weatherData.wind.speed} m/s` : 'loading...'}
        </p>
      </div>
    </div>
  );
}

export default Country;
