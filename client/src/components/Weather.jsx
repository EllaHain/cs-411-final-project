import React, { useState, useEffect } from 'react';
import Spotify from './Spotify'; // Import the Spotify component

const Weather = ({accessToken}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=ed8e96a3cdb3c6aac7c40cb9e4859593`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location !== '') {
      fetchWeatherData();
    }
  }, []);

  const preprocessLocation = (location) => {
    let formattedLocation = location.trim();
    formattedLocation = formattedLocation.replace(/\b\w/g, (char) => char.toUpperCase());
    formattedLocation = formattedLocation.replace(/\s+/g, ' ');
    return formattedLocation;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formattedLocation = preprocessLocation(location);
    if (formattedLocation !== '') {
      setLocation(formattedLocation);
      fetchWeatherData(formattedLocation);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Location:
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </label>
        <button type="submit">Get Weather</button>
      </form>
      {loading ? (
        <p>Loading weather data...</p>
      ) : weatherData ? (
        <div>
          <h2>Weather Forecast</h2>
          <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C / {(((weatherData.main.temp - 273.15) * 9/5) + 32).toFixed(2)}°F</p>
          <p>Condition: {weatherData.weather[0].description}</p>
          {/* Integrate Spotify component and pass weather condition as prop */}
          <Spotify weatherCondition={weatherData.weather[0].description} accessToken={accessToken} />
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default Weather;
