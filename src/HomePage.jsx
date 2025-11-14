import React, { useContext } from 'react'; // Import useContext
import { useNavigate } from 'react-router-dom';
import { CharacterContext } from './contexts/CharacterContext'; // Import the context

/**
 * @component HomePage
 * @description The main page of the application, serving as the character search and display interface.
 *              It consumes character-related state and functions from `CharacterContext` to
 *              display search results, manage the search input, and handle favoriting.
 *              Allows users to search for Rick and Morty characters, view their basic details,
 *              and navigate to a detailed view or add/remove from favorites.
 *
 * @returns {JSX.Element} The home page with search functionality and character display.
 */

function HomePage() {
  // Consume state and functions from CharacterContext
  const {
    searchTerm,
    setSearchTerm,
    characters,
    loading,
    error,
    favoriteIds,
    handleToggleFavorite,
  } = useContext(CharacterContext);

  // Navigate - Hook from React Router for programmatic navigation.
  const navigate = useNavigate();
  const attentionGetter = "Wubba Lubba Dub Dub! Dive into the multiverse!";

   // --- Event Handlers ---
  /**
   * @function handleSearchChange
   * @description Updates the `searchTerm` state whenever the user types into the search input.
   *              This update will trigger the `useEffect` in `CharacterProvider`, which then
   *              initiates the debounced API call.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input element.
   */

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl text-center">
      {/* Page Title and Introduction */}
      <h2 className="text-4xl font-extrabold text-blue-400 mb-4">{attentionGetter}</h2>
      <p className="text-lg text-gray-300 mb-6">Search for your favorite Rick and Morty characters!</p>

      {/* Search Input Field */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search character name..."
          value={searchTerm} // Controlled component: input value is tied to `searchTerm` state
          onChange={handleSearchChange} // Call `handleSearchChange` on every input change
          className="p-3 w-full max-w-md text-lg border-2 border-blue-500 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-300 transition-all duration-200"
        />
      </div>

      {/* Conditional Rendering: Loading, Error, and Character List */}
      {loading && <p className="text-xl text-blue-300">Loading characters...</p>}
      {error && <p className="text-xl text-red-500 font-semibold">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {/* Render characters if available */}
        {characters.length > 0 ? (
          characters.map((character) => (
            <div 
              key={character.id} 
              className="bg-gray-700 rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center"
            >
              <img 
                src={character.image} 
                alt={character.name} 
                className="w-36 h-36 rounded-full object-cover mb-4 border-4 border-blue-500 shadow-md"
              />
              <h3 
                className="text-2xl font-bold text-gray-100 mb-2 cursor-pointer hover:text-blue-400 transition-colors duration-200"
                // Navigate to character details on click
                onClick={() => navigate(`/character/${character.id}`)}
              >
                {character.name}
              </h3>
              <p className="text-gray-300">Status: {character.status}</p>
              <p className="text-gray-300">Species: {character.species}</p>
              
              {/* Button to add/remove character from favorites */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the card's `onClick` (navigation) from firing
                  handleToggleFavorite(character.id); // Toggle favorite status via context
                }}
                className={`mt-4 px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-200 
                  ${favoriteIds.includes(character.id) 
                    ? 'bg-red-600 hover:bg-red-700' // Red if already a favorite
                    : 'bg-green-600 hover:bg-green-700' // Green if not a favorite
                  }`}
              >
                {favoriteIds.includes(character.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          ))
        ) : (
          /* Conditional messages based on search state */
          !loading && !error && searchTerm === '' && <p className="text-xl text-gray-400 col-span-full">Start typing to search for characters!</p>
        )}
        {!loading && !error && searchTerm !== '' && characters.length === 0 && (
          <p className="text-xl text-gray-400 col-span-full">No characters found for "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;