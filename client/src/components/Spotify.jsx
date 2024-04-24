import React, { useState, useEffect } from 'react';

const Spotify = () => {
  const [playlistData, setPlaylistData] = useState(null);

  useEffect(() => {
    fetch('https://api.spotify.com/v1/playlists/{playlist_id}', {
      headers: {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Data fetched successfully
        setPlaylistData(data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching playlist data:', error);
      });
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div>
      {playlistData ? (
        <div>
          <h2>Playlist Information</h2>
          <p>Name: {playlistData.name}</p>
          <p>Owner: {playlistData.owner.display_name}</p>
          <p>Total Tracks: {playlistData.tracks.total}</p>
        </div>
      ) : (
        <p>Loading playlist data...</p>
      )}
    </div>
  );
};

export default Spotify;

