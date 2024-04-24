import React from 'react';
import WeatherComponent from '../components/Weather';
import PlaylistComponent from '../components/Spotify';

const Dashboard = () => {
  return (
    <div>
      <WeatherComponent />
      <PlaylistComponent />
    </div>
  );
}

export default Dashboard;
