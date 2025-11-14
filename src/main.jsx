import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import './index.css'; // Global styles including Tailwind

/**
 * APPLICATION ENTRY POINT
 * 
 * This file is the starting point of the React application
 * It renders the root component into the DOM
 * 
 * - React.StrictMode: Activates additional checks and warnings for development
 * - RouterProvider: Provides routing context to the entire app using our router configuration
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);