import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import WeatherComponent from '../components/Weather';

const Dashboard = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate instead of useHistory

  const handleLogin = () => {
    const clientId = 'a92ce09ecca44a398b703c4ab2027a2f';
    const redirectUri = 'http://localhost:5173/dashboard';
    const scope = 'user-read-private user-read-email';
    const responseType = 'token';
  
    // Redirect the user to Spotify authorization endpoint
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=${responseType}`;
  };
  
  // Function to handle the redirect after authorization
  const handleAuthorizationResponse = () => {
    // Extract the access token from the URL fragment
    const params = new URLSearchParams(window.location.hash.substr(1));
    setAccessToken(params.get('access_token'));
  };
  
  useEffect(() => {
    handleAuthorizationResponse(); // Handle authorization response on mount
  }, []); // Empty dependency array ensures this effect runs only once on mount
  useEffect(() => {
    // Check if access token exists in localStorage
    const token = localStorage.getItem('accessToken');
    const expirationTime = localStorage.getItem('expirationTime');
    
    if (token && expirationTime) {
      const currentTime = Date.now();
      if (currentTime < expirationTime) {
        setAccessToken(token);
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
  }, [navigate]); // Add navigate to dependency array
  
  return (
    <div>
      <h2>Login with Spotify</h2>
      {accessToken && !isExpired ? (
        <p>Logged in with Spotify</p>
      ) : (
        <button onClick={handleLogin}>Login with Spotify</button>
      )}
      <WeatherComponent accessToken={accessToken} />
    </div>
  );
};

export default Dashboard;
