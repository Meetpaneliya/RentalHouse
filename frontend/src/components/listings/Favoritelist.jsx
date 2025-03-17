import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/api/favorites/getfav'); // Adjust the API endpoint as needed
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (houseId) => {
    try {
      await axios.delete(`/api/favorites/removefav/${houseId}`); // Adjust the API endpoint as needed
      // Update the favorites list after removing
      setFavorites(favorites.filter(fav => fav.houseId !== houseId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div>
      <h1>My Favorites</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map(favorite => (
            <li key={favorite._id}>
              {/* Display favorite house details here */}
              <p>House ID: {favorite.houseId}</p>
              {/* You might want to fetch and display more details about the house */}
              <button onClick={() => handleRemoveFavorite(favorite.houseId)}>Remove from Favorites</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default Favorites;
