import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
      .then((response) => {
        // console.log(response.data);
        setWeather(response.data);
      });
  }, [capital, api_key]);

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Wind: {weather.wind.speed} m/s direction {weather.wind.deg}°</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
    </div>
  );
};

export default Weather;