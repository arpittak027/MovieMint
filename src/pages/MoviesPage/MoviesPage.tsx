import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper
} from '@mui/material';
import MovieCard from '../../components/MovieCard/MovieCard';
import LocationSelector from '../../components/LocationSelector/LocationSelector';
import MovieFilters from '../../components/MovieFilters/MovieFilters';
import { Movie, State, City, CinemaHall } from '../../types/movieTypes';
import { states, movies, getAllCategories } from '../../data/moviesData';

const languages = ['All', 'Hindi', 'English', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Bengali', 'Marathi'];
const categories = ['All', 'Action', 'Drama', 'Comedy', 'Horror', 'Romance'];

const MoviesPage: React.FC = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCinemaHall, setSelectedCinemaHall] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [availableMovies, setAvailableMovies] = useState<Movie[]>(movies);

  // Update available movies when location is selected
  useEffect(() => {
    if (selectedState && selectedCity && selectedCinemaHall) {
      const state = states.find((s: State) => s.id === selectedState);
      const city = state?.cities.find((c: City) => c.id === selectedCity);
      const hall = city?.cinemaHalls.find((h: CinemaHall) => h.id === selectedCinemaHall);
      
      if (hall) {
        const hallMovieIds = hall.movies.map(m => m.movieId);
        const filteredMovies = movies.filter((movie: Movie) => hallMovieIds.includes(movie.id));
        setAvailableMovies(filteredMovies);
      }
    } else {
      setAvailableMovies(movies);
    }
  }, [selectedState, selectedCity, selectedCinemaHall]);

  // Filter movies based on search, language, and category
  const getFilteredMovies = () => {
    let filtered = [...availableMovies];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((movie: Movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by language
    if (selectedLanguage !== 'All') {
      filtered = filtered.filter((movie: Movie) => movie.language === selectedLanguage);
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((movie: Movie) => movie.category === selectedCategory);
    }

    return filtered;
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      pt: { xs: 8, sm: 9, md: 10 }, 
      pb: 4,
      backgroundColor: 'background.default'
    }}>
      <Container maxWidth="xl">
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            mb: 3,
            fontWeight: 'bold',
            color: 'text.primary'
          }}
        >
          Movies
        </Typography>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 2, sm: 3 }, 
            mb: 4, 
            bgcolor: 'background.paper',
            borderRadius: '12px'
          }}
        >
          <LocationSelector
            states={states}
            selectedState={selectedState}
            selectedCity={selectedCity}
            selectedCinemaHall={selectedCinemaHall}
            onStateChange={setSelectedState}
            onCityChange={setSelectedCity}
            onCinemaHallChange={setSelectedCinemaHall}
          />
        </Paper>

        <MovieFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          languages={languages}
          categories={categories}
        />

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {getFilteredMovies().map((movie: Movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id} sx={{ display: 'flex' }}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MoviesPage;
