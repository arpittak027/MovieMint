import React, { useState, useMemo } from 'react';
import {
  Box, Container, Typography, Grid, Button, useTheme,
  IconButton, Card, CardMedia, CardContent, Rating,
  useMediaQuery, Skeleton
} from '@mui/material';
import {
  PlayCircleOutline, FavoriteBorder, Favorite,
  ChevronLeft, ChevronRight, LocationOn, Star
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Movie } from '../../types/movieTypes';
import { getAllMovies, upcomingMovies } from '../../data/moviesData';
import { useAuth } from '../../context/AuthContext';

/**
 * HomePage Component
 * Main landing page displaying featured movies, trending movies, and upcoming releases
 */
const HomePage: React.FC = () => {
  // Hooks and Context
  const theme = useTheme();
  const navigate = useNavigate();
  const { userProfile, isAuthenticated, addToWishlist, removeFromWishlist } = useAuth();
  
  // Responsive Design
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // State
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  // Computed Properties
  const allMovies = getAllMovies();
  const featuredMovies = useMemo(() => allMovies.slice(0, 5), [allMovies]); // Top 5 featured movies
  const trendingMovies = useMemo(() => 
    [...allMovies].sort((a, b) => b.rating - a.rating).slice(0, 4), 
    [allMovies]
  ); // Top 4 trending movies
  const randomUpcomingMovies = useMemo(() => 
    [...upcomingMovies].sort(() => Math.random() - 0.5).slice(0, 3),
    []
  ); // 3 random upcoming movies

  // Event Handlers
  const handleWishlist = (movieId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) return navigate('/login');
    
    const isInWishlist = userProfile?.wishlist?.includes(movieId);
    isInWishlist ? removeFromWishlist(movieId) : addToWishlist(movieId);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/500x750?text=Movie+Poster+Not+Available';
  };

  // Render Functions
  const renderFeaturedMovie = (movie: Movie) => (
    <Box
      key={movie.id}
      sx={{
        position: 'relative',
        height: { xs: '50vh', md: '70vh' },
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${movie.backdrop || movie.posterUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        padding: 4
      }}
    >
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" color="white" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body1" color="white" paragraph>
              {movie.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={movie.rating} readOnly precision={0.5} />
              <Typography variant="body2" color="white" sx={{ ml: 1 }}>
                ({movie.rating})
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayCircleOutline />}
              onClick={() => navigate(`/movie/${movie.id}`)}
              sx={{ mr: 2 }}
            >
              Book Now
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  const renderMovieCard = (movie: Movie, index: number) => {
    const isInWishlist = userProfile?.wishlist?.includes(movie.id);
    
    return (
      <Grid item xs={12} sm={6} md={3} key={movie.id}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            component="img"
            height="300"
            image={movie.posterUrl}
            alt={movie.title}
            onError={handleImageError}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6">
              {movie.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Rating value={movie.rating} readOnly precision={0.1} size="small" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({movie.rating})
              </Typography>
            </Box>
          </CardContent>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <IconButton onClick={(e) => handleWishlist(movie.id, e)}>
              {isInWishlist ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
            <Button size="small" onClick={() => navigate(`/movie/${movie.id}`)}>
              Book Now
            </Button>
          </Box>
        </Card>
      </Grid>
    );
  };

  return (
    <Box>
      {/* Featured Movies Carousel */}
      <Carousel
        animation="slide"
        autoPlay={false}
        indicators={true}
        navButtonsAlwaysVisible
        cycleNavigation
        sx={{ mb: 4 }}
      >
        {featuredMovies.map(renderFeaturedMovie)}
      </Carousel>

      {/* Trending Movies Section */}
      <Container>
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          Trending Now
        </Typography>
        <Grid container spacing={3}>
          {trendingMovies.map(renderMovieCard)}
        </Grid>

        {/* Upcoming Movies Section */}
        <Typography variant="h4" gutterBottom sx={{ mt: 6 }}>
          Coming Soon
        </Typography>
        <Grid container spacing={3}>
          {randomUpcomingMovies.map(renderMovieCard)}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
