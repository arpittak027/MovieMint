/**
 * Main Application Component
 * This is the root component of the MovieMint application that sets up:
 * - Routing configuration using React Router
 * - Global state providers (Auth and Movie contexts)
 * - Theme configuration using Material-UI
 * - Error boundary for graceful error handling
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

// Page Components
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import BookingPage from './pages/BookingPage/BookingPage';
import BookingSuccess from './pages/BookingSuccess/BookingSuccess';
import AccountPage from './pages/AccountPage/AccountPage';
import SignupForm from './components/Auth/SignupForm';
import LoginForm from './components/Auth/LoginForm';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    // Theme Provider for consistent styling across the app
    <ThemeProvider theme={theme}>
      {/* CssBaseline for consistent baseline styles */}
      <CssBaseline />
      
      {/* Auth Provider for user authentication state */}
      <AuthProvider>
        {/* Movie Provider for global movie data state */}
        <MovieProvider>
          {/* Error Boundary catches and handles runtime errors */}
          <ErrorBoundary>
            {/* Global Navigation Bar */}
            <Navbar />
            
            {/* Route Configuration */}
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/login" element={<LoginForm />} />
              
              {/* Protected Routes (require authentication) */}
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/account" element={<AccountPage />} />
            </Routes>
          </ErrorBoundary>
        </MovieProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
