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

              savePlaylistToBackend({
                  title: playlist.name,
                  description: playlist.description,
                  owner: playlist.owner.display_name, // Assuming owner field exists in the playlist object
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

    const savePlaylistToBackend = async (playlistData) => {
      try {
        const { title, description, owner } = playlistData;
        console.log(title, description, owner)
        const response = await fetch('http://localhost:3088/api/spotify/playlists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description, owner }),
        });
        console.log(response)
         if (!response.ok) {
          throw new Error('Failed to save playlist');
        }
         const result = await response.json();
        console.log('Playlist saved successfully:', result);
      } catch (error) {
        console.error('Error saving playlist:', error);
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
        console.log(playlistId)
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("track",data.items)
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
        <p style={{ fontFamily: 'Montserrat', color: 'black', marginLeft: '20px' }}>Loading playlists...</p>
      ) : playlistData ? (
        <div style={{ display: 'flex' }}>
          <div style={{ textAlign: 'left', marginLeft: '20px', fontFamily: 'Montserrat', color: 'black', marginRight:"70px"}}>
            <h2>Playlist Information</h2>
            <p><mark style={{backgroundColor:"white"}}>Name: {playlistData.name}</mark></p>
            <p><mark style={{backgroundColor:"white"}}>Description: {playlistData.description}</mark></p>
            <p><mark style={{backgroundColor:"white"}}>Owner: {playlistData.owner.display_name}</mark></p>
            <p><mark style={{backgroundColor:"white"}}>Total Tracks: {playlistData.tracks.length}</mark></p>
          </div>
          <div style={{ textAlign: 'center' }}>
            {playlistData.coverImage && (
              <img src={playlistData.coverImage} alt="Playlist Cover" style={{ width: '350px', height: '350px', display: 'block', margin: '0 auto' }} />
            )}
            <div style={{ marginTop: '10px' }}>
              <a target="_blank" href={playlistData.external_urls.spotify} style={{ fontFamily: 'Montserrat',display: 'inline-block', backgroundColor: 'black', color: 'white', padding: '10px 20px', textAlign: 'center', textDecoration: 'none', fontSize: '16px', borderRadius: '5px', cursor: 'pointer' }}>Get Playlist</a>
            </div>
          </div>
          <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            <ul>
              {playlistData.tracks.map((track, index) => (
                <li key={index} style={{ fontFamily: 'Montserrat', color: 'black' }}>{track.track.name}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p style={{ fontFamily: 'Montserrat', color: 'black', marginLeft: '20px' }}>No playlists found for the current weather condition</p>
      )}
    </div>
  );


};

export default Spotify;