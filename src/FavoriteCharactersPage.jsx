import React, { useState, useEffect, useCallback, useContext } from 'react'; // Import useContext
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { CharacterContext } from './contexts/CharacterContext'; // Import the context

function FavoriteCharactersPage() {
  // Use favoriteIds and handleToggleFavorite from context
  const { favoriteIds, handleToggleFavorite } = useContext(CharacterContext);

  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchFavoriteCharacters = useCallback(async (ids) => {
    if (ids.length === 0) {
      setFavoriteCharacters([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${ids.join(',')}`);
      setFavoriteCharacters(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (err) {
      setError('Failed to load favorite characters. Some characters might have been removed from the API.');
      console.error("Error fetching favorite characters:", err);
      setFavoriteCharacters([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Pass the favoriteIds from context to the fetch function
    fetchFavoriteCharacters(favoriteIds);
  }, [favoriteIds, fetchFavoriteCharacters]); // Depend on favoriteIds from context

  // Removed the localStorage useEffect here as it's now handled in CharacterContext

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl text-center">
      <h2 className="text-4xl font-extrabold text-blue-400 mb-6">Your Favorite Characters ({favoriteIds.length}/4)</h2> {/* Use favoriteIds from context */}
      
      {favoriteCharacters.length === 0 && (
        <p className="text-xl text-gray-400">You haven't added any characters to your favorites yet. <br/> Go back to the <Link to="/" className="text-blue-400 hover:underline">home page</Link> to search!</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {favoriteCharacters.map((character) => (
          <div 
            key={character.id} 
            className="bg-gray-700 rounded-xl p-5 shadow-lg flex flex-col items-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <img 
              src={character.image} 
              alt={character.name} 
              className="w-36 h-36 rounded-full object-cover mb-4 border-4 border-blue-500 shadow-md cursor-pointer"
              onClick={() => navigate(`/character/${character.id}`)}
            />
            <h3 
              className="text-2xl font-bold text-gray-100 mb-2 cursor-pointer hover:text-blue-400 transition-colors duration-200"
              onClick={() => navigate(`/character/${character.id}`)}
            >
              {character.name}
            </h3>
            <p className="text-gray-300">Status: {character.status}</p>
            <p className="text-gray-300">Species: {character.species}</p>
            
            <button
              onClick={() => handleToggleFavorite(character.id)} // Use context's handleToggleFavorite
              className="mt-4 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors duration-200"
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteCharactersPage;