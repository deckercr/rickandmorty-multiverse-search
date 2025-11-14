import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * CHARACTER DETAILS PAGE COMPONENT
 * 
 * This component demonstrates DYNAMIC ROUTING with React Router
 * The route is defined in router.jsx as: path: 'character/:id'
 * The :id is a URL parameter that can be any character ID
 * 
 * For example:
 * - /character/1 shows Rick Sanchez
 * - /character/2 shows Morty Smith
 * - /character/100 shows character with ID 100
 */

function CharacterDetailsPage() {
    /**
   * USEPARAMS HOOK - Extracting URL Parameters
   * 
   * useParams() extracts dynamic segments from the current URL
   * In our route 'character/:id', the :id is a parameter
   * 
   * Example: If URL is /character/5, then id = "5"
   * This allows us to fetch the specific character's data from the API
   */
    const { id } = useParams(); // Get the character ID from the URL
    const navigate = useNavigate(); // For navigating back
    const [character, setCharacter] = useState(null); // State for storing the fetched character data
    const [loading, setLoading] = useState(true); // State for loading indicator during API call
    const [error, setError] = useState(null); // State for error messages if API call fails

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(response.data);
      } catch (err) {
        setError('Failed to load character details. Character might not exist.');
        console.error("Error fetching character details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCharacterDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl text-blue-300">Loading character details...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-500 font-semibold p-4 bg-gray-800 rounded-lg shadow-lg">
        <p>{error}</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-200"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="text-center text-xl text-gray-400 p-4 bg-gray-800 rounded-lg shadow-lg">
        <p>No character data available.</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-200"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-800 rounded-xl shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-8">
      <img 
        src={character.image} 
        alt={character.name} 
        className="w-64 h-64 rounded-full object-cover border-4 border-blue-500 shadow-xl shrink-0"
      />
      <div className="text-left">
        <h1 className="text-5xl font-extrabold text-blue-400 mb-4">{character.name}</h1>
        <p className="text-xl text-gray-300 mb-2"><strong>Status:</strong> {character.status}</p>
        <p className="text-xl text-gray-300 mb-2"><strong>Species:</strong> {character.species}</p>
        {character.type && <p className="text-xl text-gray-300 mb-2"><strong>Type:</strong> {character.type}</p>}
        <p className="text-xl text-gray-300 mb-2"><strong>Gender:</strong> {character.gender}</p>
        <p className="text-xl text-gray-300 mb-2"><strong>Origin:</strong> {character.origin.name}</p>
        <p className="text-xl text-gray-300 mb-4"><strong>Last Known Location:</strong> {character.location.name}</p>
        
        <button 
          onClick={() => navigate(-1)} // Go back to the previous page
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors duration-200"
        >
          Back to Search
        </button>
      </div>
    </div>
  );
}

export default CharacterDetailsPage;