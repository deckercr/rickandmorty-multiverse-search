import { Outlet, Link } from 'react-router-dom';
import { CharacterProvider } from './contexts/CharacterContext'; // Import the provider

/**
 * @component App
 * @description The main application component. It serves as the root layout wrapper for the entire
 *              Rick and Morty Character Finder application.
 *              It integrates the `CharacterProvider` to make global character search and favorite state
 *              available to all child routes.
 *              It defines the common structural elements like the header with navigation,
 *              a main content area for routing, and a footer.
 *
 * @returns {JSX.Element} The main application layout.
 */

function App() {
  return (
    /**
     * @wrapper CharacterProvider
     * @description Wraps the entire application tree. This ensures that all components rendered
     *              within <App /> (including HomePage, CharacterDetailsPage, FavoriteCharactersPage)
     *              can access the shared state and functions related to characters.
     */
    <CharacterProvider> {/* Wrap the entire application with the context provider */}
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
        <header className="bg-blue-600 text-white p-4 shadow-lg mb-8 rounded-lg mx-auto w-full max-w-5xl">
          <nav className="flex justify-between items-center">

            {/* Link to the Home Page (root path) */}
            <Link to="/" className="text-3xl font-bold hover:text-blue-200 transition-colors duration-200">
              Rick and Morty Character Finder
            </Link>

            {/* Navigation Links Group */}
            <div className="space-x-4">
              {/* Home Page Link */}
              <Link 
                to="/" 
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md transition-colors duration-200"
              >
                Home
              </Link>
              {/* Favorites Page Link */}
              <Link 
                to="/favorites" 
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md transition-colors duration-200"
              >
                Favorites
              </Link>
            </div>
          </nav>
        </header>

        {/*
         * @section Main Content Area
         * @description This is the primary area where different route components are rendered.
         *              `Outlet` is a React Router component that acts as a placeholder
         *              for the child route component that matches the current URL.
         *              For example, when the URL is '/', HomePage will be rendered here.
         */}

        <main className="grow p-4 mx-auto w-full max-w-5xl">
          <Outlet />
        </main>

        <footer className="mt-8 p-4 bg-gray-800 rounded-lg text-gray-400 text-center mx-auto w-full max-w-5xl">
          <p>© 2025 Rick's Rick and Morty Fan App</p>
        </footer>
      </div>
    </CharacterProvider>
  );
}

export default App;