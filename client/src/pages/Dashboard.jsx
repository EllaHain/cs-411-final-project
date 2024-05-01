import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherComponent from '../components/Weather';
import image from "/images/background1.jpg";

const Dashboard = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const clientId = 'a92ce09ecca44a398b703c4ab2027a2f';
    const redirectUri = 'http://localhost:5173';
    const scope = 'user-read-private user-read-email';
    const responseType = 'token';
  
    // Redirect the user to Spotify authorization endpoint
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=${responseType}`;
  };
  
  // Function to handle the redirect after authorization
  const handleAuthorizationResponse = () => {
    // Extract the access token from the URL fragment
    const params = new URLSearchParams(window.location.hash.substr(1));
    const token = params.get('access_token');
    if (token) {
      setAccessToken(token);
      setIsLoggedIn(true);
      localStorage.setItem('accessToken', token);
      const expirationTime = Date.now() + (1 * 60 * 60 * 1000); // 1 hour
      localStorage.setItem('expirationTime', expirationTime);
    }
  };

  useEffect(() => {
    handleAuthorizationResponse();
  }, []);

  useEffect(() => {
    // Check if access token exists in localStorage
    const token = localStorage.getItem('accessToken');
    const expirationTime = localStorage.getItem('expirationTime');
    
    if (token && expirationTime) {
      const currentTime = Date.now();
      if (currentTime < expirationTime) {
        setAccessToken(token);
        setIsLoggedIn(true);
      } else {
        setIsExpired(true);
        // Token has expired, clear localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expirationTime');
        navigate('/dashboard'); // Use navigate instead of history.push
      }
    } else {
      // Handle authorization response on mount if available
      handleAuthorizationResponse();
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
      {!isLoggedIn ? (
        <>
          <h2 style={{ fontFamily: 'Montserrat', color: 'white', textAlign: 'center', fontSize: '60px', marginBottom: '2px' }}>Login with</h2>
          <h2 style={{ fontFamily: 'Montserrat', color: 'white', textAlign: 'center', fontSize: '60px', marginBottom: '40px', marginTop: 0 }}>Spotify</h2>
          <button style={{ 
            fontFamily: 'Montserrat', 
            color: 'white',
            backgroundColor: '#6E7D9A', 
            border: 'none', 
            padding: '15px 150px', 
            cursor: 'pointer', 
            transition: 'background-color 0.3s ease', 
            marginBottom: '20px',
            borderRadius: '10px'
          }} onClick={handleLogin}>Login</button>
        </>
      ) : (
        <WeatherComponent isLoggedIn={isLoggedIn} accessToken={accessToken} />
      )}
    </div>
  );
};

export default Dashboard;
