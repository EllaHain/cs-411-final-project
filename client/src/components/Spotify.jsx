import React, { useState, useEffect } from 'react';

const Spotify = ({ weatherCondition, accessToken }) => {
  const [playlistData, setPlaylistData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlaylistsByCondition = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(weatherCondition)}&type=playlist`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Shuffle the playlists array randomly
        const playlists = shuffleArray(data.playlists.items);
  
        let selectedPlaylistIndex = 0;
        while (selectedPlaylistIndex < playlists.length) {
          const playlist = playlists[selectedPlaylistIndex];
          const tracks = await fetchPlaylistTracks(playlist.id);
          if (tracks.length > 0) {
            const coverImage = await fetchPlaylistCover(playlist.id);
            const description = await fetchPlaylistDescription(playlist.id); // Fetch playlist description
  
            // Check if the playlist description includes the specified word
            if (!description || !description.toLowerCase().includes('overwatch')) {
              setPlaylistData({
                ...playlist,
                tracks: tracks,
                coverImage: coverImage,
                description: description // Include playlist description in the state
              });
              break;
            }
          }
          selectedPlaylistIndex++;
        }
        if (selectedPlaylistIndex === playlists.length) {
          // No playlists without the specified word found
          setPlaylistData(null);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setLoading(false);
      }
    };

    const fetchPlaylistCover = async (playlistId) => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/images`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.length > 0) {
          // Assuming the first image in the array is the cover image
          return data[0].url;
        } else {
          return null; // No cover image found
        }
      } catch (error) {
        console.error('Error fetching playlist cover:', error);
        return null;
      }
    };

    const fetchPlaylistTracks = async (playlistId) => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.items;
      } catch (error) {
        console.error('Error fetching playlist tracks:', error);
        return [];
      }
    };

    // Function to fetch playlist description
    const fetchPlaylistDescription = async (playlistId) => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.description;
      } catch (error) {
        console.error('Error fetching playlist description:', error);
        return null;
      }
    };

    // Function to shuffle array elements randomly
    const shuffleArray = (array) => {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    };

    if (weatherCondition) {
      fetchPlaylistsByCondition();
    }
  }, [weatherCondition, accessToken]);

  return (
    <div>
      {loading ? (
        <p>Loading playlists...</p>
      ) : playlistData ? (
        <div>
          <h2>Playlist Information</h2>
          {playlistData.coverImage && (
            <a target= "_blank" href={playlistData.external_urls.spotify}><img src={playlistData.coverImage} alt="Playlist Cover"/></a>
          )}
          <p>Name: {playlistData.name}</p>
          <p>Description: {playlistData.description}</p> {/* Display playlist description */}
          <p>Owner: {playlistData.owner.display_name}</p>
          <p>Total Tracks: {playlistData.tracks.length}</p>
          <ul>
            {playlistData.tracks.slice(0, 10).map((track, index) => (
              <li key={index}>{track.track.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No playlists found for the current weather condition</p>
      )}
    </div>
  );
};

export default Spotify;
