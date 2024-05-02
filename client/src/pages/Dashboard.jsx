import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherComponent from '../components/Weather';
import image from "/images/background1.jpg";

const Dashboard = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const clientId = 'a92ce09ecca44a398b703c4ab2027a2f';
    const redirectUri = 'http://localhost:5173/dashboard';
    const scope = 'user-read-private user-read-email';
    const responseType = 'token';
    const showDialog = true; // Set to true to force user approval again
    
    // Redirect the user to Spotify authorization endpoint
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=${responseType}&show_dialog=${showDialog}`;
  };
  
  // Function to handle the redirect after authorization
  const handleAuthorizationResponse = () => {
    // Extract the access token and expiration time from the URL fragment
    const params = new URLSearchParams(window.location.hash.substr(1));
    const token = params.get('access_token');
    const expiresIn = params.get('expires_in');
    
    if (token && expiresIn) {
      setAccessToken(token);
      setIsLoggedIn(true);
      localStorage.setItem('accessToken', token);
      
      // Calculate expiration time
      const expirationTime = Date.now() + (parseInt(expiresIn) * 1000); // Convert expiresIn to milliseconds
      localStorage.setItem('expirationTime', expirationTime);
      console.log("Expiration time:", new Date(expirationTime)); // Print expiration time
    }
  };

  useEffect(() => {
    handleAuthorizationResponse();
  }, []);

  useEffect(() => {
    // Check if access token exists in localStorage
    const token = localStorage.getItem('accessToken');
    const expirationTime = localStorage.getItem('expires_in');
    console.log("Expiration Time 2:", new Date(parseInt(expirationTime)).toLocaleString('en-US', {timeZone: 'America/New_York', hour12: true}));
    if (token && expirationTime) {
      const currentTime = Date.now();
      const expiration = parseInt(expirationTime); // Parse expirationTime to int
      if (currentTime < expiration) {
        setAccessToken(token);
        setIsLoggedIn(true);
      } else {
        // Token has expired, clear localStorage and navigate
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expirationTime');
        setAccessToken(null);
        setIsLoggedIn(false);
        navigate('/dashboard'); // Navigate to login page
      }
    }
  }, [navigate]);

  return (
    <div style={{
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    }}>
      {accessToken === null || accessToken.expires_in <= Date.now()? (
        <>
          <h2 style={{ fontFamily: 'Montserrat', color: 'black', textAlign: 'center', fontSize: '60px', marginBottom: '2px' }}>Login with</h2>
          <h2 style={{ fontFamily: 'Montserrat', color: 'black', textAlign: 'center', fontSize: '60px', marginBottom: '40px', marginTop: 0 }}>Spotify</h2>
          <button style={{ 
            fontFamily: 'Montserrat', 
            color: 'white',
            backgroundColor: 'black', 
            border: 'none', 
            padding: '15px 150px', 
            cursor: 'pointer', 
            transition: 'background-color 0.3s ease', 
            marginBottom: '20px',
            borderRadius: '10px'
          }} onClick={handleLogin}>Login</button>
        </>
      ) : (
        <WeatherComponent accessToken={accessToken} handleAuthorizationResponse={handleAuthorizationResponse}/>
      )}
    </div>
  );
};

export default Dashboard;
