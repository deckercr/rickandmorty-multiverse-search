import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import HomePage from './HomePage.jsx';
import CharacterDetailsPage from './CharacterDetailsPage.jsx';
import FavoriteCharactersPage from './FavoriteCharactersPage.jsx';

/**
 * ROUTER CONFIGURATION
 * 
 * Defines all routes for the application using React Router
 * Uses nested routing - App.jsx is the parent layout, and other pages are children
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Parent layout component
    children: [
      {
        index: true, // Default route when path is exactly '/'
        element: <HomePage />, // Search and browse characters
      },
      {
        /**
         * DYNAMIC ROUTE with URL Parameter
         * 
         * path: 'character/:id' creates a dynamic route segment
         * The :id is a URL parameter that can match any value
         * 
         * Examples:
         * - /character/1 → id = "1"
         * - /character/42 → id = "42"
         * - /character/999 → id = "999"
         * 
         * The CharacterDetailsPage component uses useParams() to extract this id
         */
        path: 'character/:id',
        element: <CharacterDetailsPage />, // Individual character details
      },
      {
        path: 'favorites', // Static route for favorites page
        element: <FavoriteCharactersPage />, // User's favorite characters
      },
    ],
  },
]);

export default router;