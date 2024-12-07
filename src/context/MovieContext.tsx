import React, { createContext, useContext, useState, useCallback } from 'react';
import { Movie, State, City } from '../types/movieTypes';
import { states } from '../data/locationData';
import { movies, getMovieById, getMoviesByCategory, getAllMovies } from '../data/moviesData';

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

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const getMoviesByState = useCallback((stateId: string): Movie[] => {
    const state: State | undefined = states.find(s => s.id === stateId);
    if (!state) return [];
    
    const movieIds: string[] = state.cities.flatMap((city: City) => 
      city.cinemaHalls.flatMap(hall => 
        hall.movies.map(m => m.movieId)
      )
    );
    
    return movies.filter((movie: Movie) => movieIds.includes(movie.id));
  }, [states, movies]);

  const value: MovieContextType = {
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
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};
