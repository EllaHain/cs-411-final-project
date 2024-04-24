import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/weather')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Data fetched successfully
        setWeatherData(data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching weather data:', error);
      });
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div>
      {weatherData ? (
        <div>
          <h2>Weather Forecast</h2>
          <p>Temperature: {weatherData.temperature}</p>
          <p>Condition: {weatherData.condition}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
