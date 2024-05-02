import React, { useState, useEffect } from 'react';
import Spotify from './Spotify'; // Import the Spotify component

const Weather = ({accessToken, handleAuthorizationResponse}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [formMoved, setFormMoved] = useState(false);
  

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
      setFormMoved(true);
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
      handleAuthorizationResponse();
    }
  };

  const formStyle = formMoved
    ? {
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      };

      return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
          <form onSubmit={handleSubmit} style={formStyle}>
            {!formMoved && (
              <p style={{ fontFamily: 'Montserrat', color: 'black', textAlign: 'center', fontSize: '60px', fontWeight: 800, marginBottom: '40px', marginLeft: '20px' }}>
                Logged in.
              </p>
            )}
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location..."
              style={{
                fontFamily: 'Montserrat',
                textAlign: 'left',
                color: '#6E7D9A',
                border: 'none',
                padding: '15px 38px',
                width: '300px',
                marginTop: '0px',
                marginBottom: '20px',
                borderRadius: '10px',
              }}
            />
            <button
              type="submit"
              style={{
                fontFamily: 'Montserrat',
                color: 'white',
                backgroundColor: 'black',
                border: 'none',
                padding: '15px 145px',
                cursor: 'pointer',
                borderRadius: '10px',
                marginTop: '10px',
              }}
            >
              Get Weather
            </button>
          </form>
          {loading && <p>Loading weather data...</p>}
          {weatherData && (
            <div>
              <div style={{ display: 'flex', marginLeft: '20px' }}>
                <div>
                  <h2 style={{ fontFamily: 'Montserrat', color: 'black', fontSize: '50px', marginTop: '15px', marginBottom: '30px', marginRight: '0px' }}>
                    Weather Forecast
                  </h2>
                  <p style={{ fontFamily: 'Montserrat', color: 'black', fontSize: '30px', marginTop: '0px', marginBottom: '20px', marginRight: '0px' }}>
                    Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C / {(((weatherData.main.temp - 273.15) * 9) / 5).toFixed(2)}°F
                  </p>
                  <p style={{ fontFamily: 'Montserrat', color: 'black', fontSize: '30px', marginTop: '0px', marginBottom: '0px', marginRight: '0px' }}>
                    Condition: {weatherData.weather[0].description}
                  </p>
                </div>
              </div>
              {weatherData && (
                <Spotify
                  weatherCondition={weatherData.weather[0].description}
                  accessToken={accessToken}
                  setPlaylistData={({ tracks, coverImage }) => {
                    setTrackSlice(tracks);
                    setPlaylistCover(coverImage);
                  }}
                />
              )}
            </div>
          )}
        </div>
      );
};

export default Weather;