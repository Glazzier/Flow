import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/playlists/1');
        setPlaylist(response.data.songs);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>My Playlist</h1>
      <ul>
        {playlist.map((song) => (
          <li key={song.id}>{song.title} - {song.artist}</li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;