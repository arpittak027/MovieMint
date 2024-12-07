import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import BookingPage from './pages/BookingPage/BookingPage';
import BookingSuccess from './pages/BookingSuccess/BookingSuccess';
import AccountPage from './pages/AccountPage/AccountPage';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { MovieProvider } from './context/MovieContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <MovieProvider>
          <ErrorBoundary>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
            </Routes>
          </ErrorBoundary>
        </MovieProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
