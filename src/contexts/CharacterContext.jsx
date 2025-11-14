// src/contexts/CharacterContext.jsx
import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * @function debounce
 * @description Creates a debounced function that delays invoking `func` until after `delay` milliseconds
 *              have passed since the last time the debounced function was invoked.
 *              Useful for limiting the rate at which a function is called (e.g., API calls on input change).
 * @param {Function} func The function to debounce.
 * @param {number} delay The number of milliseconds to delay.
 * @returns {Function} Returns the new debounced function.
 */

const debounce = (func, delay) => {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

/**
 * @constant CharacterContext
 * @description React Context object to share character-related state and functions across components.
 *              This includes search term, search results, loading status, errors, and favorite character management.
 */
export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {

    /**
 * @component CharacterProvider
 * @description A React Context Provider component that manages the global state for character searching
 *              and favoriting. It wraps the entire application (or a significant part) to make this
 *              state available to any descendant component via `useContext`.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will consume this context.
 * @returns {JSX.Element} The provider component that makes the context value available.
 */

    // --- State Management ---
    const [searchTerm, setSearchTerm] = useState('');
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [favoriteIds, setFavoriteIds] = useState(() => {
        // Initialize favorite IDs from localStorage
        const savedFavorites = localStorage.getItem('favoriteCharacterIds');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    // --- API Call and Debounce Logic ---
  /**
   * @function debouncedFetchCharacters
   * @description A memoized and debounced asynchronous function to fetch character data from the
   *              Rick and Morty API. It uses `axios` for HTTP requests.
   *              The `debounce` utility limits API calls to happen only after the user stops typing
   *              for a specified delay (500ms).
   * @param {string} name - The character name to search for.
   * @returns {Promise<void>} This function updates component state (`characters`, `loading`, `error`).
   */
    const debouncedFetchCharacters = useCallback(
        debounce(async (name) => {
        // If the search term is empty, clear current characters and return early.
        if (!name) {
            setCharacters([]);
            return;
        }
        setLoading(true); // Set loading to true before starting the API request
        setError(null); // Clear any previous errors
        try {
            // Make the API request using Axios
            const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
            setCharacters(response.data.results);
        } catch (err) {
            // Handle Axios-specific errors (e.g., 404 Not Found)
            if (axios.isAxiosError(err) && err.response && err.response.status === 404) {
                setError(`No characters found for "${name}".`);
            } else {
                // General error message for other types of API failures
                setError('Failed to fetch characters. Please try again.');
            }
            setCharacters([]); // Clear characters array if the search failed
        } finally {
            setLoading(false); // Always set loading to false once the request is complete (success or failure)
        }
        }, 500), // Apply a 500ms debounce delay
    [] // `useCallback` dependency array. Empty array means this function is only created once.
  );

  // --- useEffects ---
  /**
   * @effect
   * @description This effect triggers the `debouncedFetchCharacters` function whenever the `searchTerm` changes.
   *              It also includes a condition (`characters.length === 0`) to potentially re-fetch on initial load
   *              if a `searchTerm` was previously set and the character list is empty.
   *              This ensures that the search results are updated in response to user input.
   */
  useEffect(() => {
    // Always call debouncedFetchCharacters whenever searchTerm changes.
    // The internal logic of debouncedFetchCharacters handles clearing when `name` is empty.
    debouncedFetchCharacters(searchTerm);
  }, [searchTerm, debouncedFetchCharacters]);

  useEffect(() => {
    // Save favorite IDs to localStorage whenever they change
    localStorage.setItem('favoriteCharacterIds', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // --- Favorite Character Toggling Logic ---
  const handleToggleFavorite = (characterId) => {
    setFavoriteIds(prevFavoriteIds => {
      const isFavorite = prevFavoriteIds.includes(characterId);
      if (isFavorite) {
        // If already a favorite, remove it from the list
        return prevFavoriteIds.filter(id => id !== characterId);
      } else {
        // If not a favorite, check if the limit (4) has been reached
        if (prevFavoriteIds.length < 4) {
            // If under limit, add the new character ID
            return [...prevFavoriteIds, characterId];
        } else {
            // If limit reached, alert the user and return the existing list without changes
            alert("You can't add more than 4 favorite characters!");
            return prevFavoriteIds;
        }
      }
    });
  };

  // --- Provider Render ---
  return (
    <CharacterContext.Provider 
      value={{
        searchTerm,        // Current search term from the input
        setSearchTerm,     // Function to update the search term
        characters,        // Array of characters found by the search
        loading,           // Boolean indicating if an API call is in progress
        error,             // Any error message from API calls
        favoriteIds,       // Array of IDs of favorite characters
        handleToggleFavorite, // Function to add/remove characters from favorites
        // debouncedFetchCharacters, // Can be exposed if a child component needed to trigger a fetch manually
      }}
    >
      {children} {/* Renders all child components wrapped by this provider */}
    </CharacterContext.Provider>
  );
};