import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Movie, State, City } from '../types/movieTypes';
import { states } from '../data/locationData';
import { movies, getMovieById, getMoviesByCategory, getAllMovies } from '../data/moviesData';

/**
 * Movie Context Interface
 * Defines the shape of the movie context with location and movie management functions
 */
interface MovieContextType {
  states: State[];
  selectedState: string;
  selectedCity: string;
  selectedMovie: Movie | null;
  getMovieById: (id: string) => Movie | undefined;
  getMoviesByCategory: (category: string) => Movie[];
  getAllMovies: () => Movie[];
  getMoviesByState: (stateId: string) => Movie[];
  setSelectedState: (stateId: string) => void;
  setSelectedCity: (cityId: string) => void;
  setSelectedMovie: (movie: Movie | null) => void;
}

// Create context with undefined default value
const MovieContext = createContext<MovieContextType | undefined>(undefined);

/**
 * MovieProvider Component
 * Provides movie-related state and functions to child components
 */
export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Location state
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Memoized function to get movies by state
  const getMoviesByState = useCallback((stateId: string): Movie[] => {
    const state = states.find(s => s.id === stateId);
    if (!state) return [];
    
    const movieIds = state.cities.flatMap((city: City) => 
      city.cinemaHalls.flatMap(hall => hall.movies.map(m => m.movieId))
    );
    
    return movies.filter(movie => movieIds.includes(movie.id));
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    states,
    selectedState,
    selectedCity,
    selectedMovie,
    getMovieById,
    getMoviesByCategory,
    getAllMovies,
    getMoviesByState,
    setSelectedState,
    setSelectedCity,
    setSelectedMovie,
  }), [
    selectedState,
    selectedCity,
    selectedMovie,
    getMoviesByState
  ]);

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

/**
 * Custom hook to use movie context
 * Throws error if used outside MovieProvider
 */
export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};
