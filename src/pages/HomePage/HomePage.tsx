import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  useTheme,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  useMediaQuery,
  Skeleton,
  Rating,
} from '@mui/material';
import {
  PlayCircleOutline,
  FavoriteBorder,
  Favorite,
  ChevronLeft,
  ChevronRight,
  LocationOn,
  Star,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../../types/movieTypes';
import { getAllMovies } from '../../data/moviesData';
import { useAuth } from '../../context/AuthContext';
import Carousel from 'react-material-ui-carousel';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userProfile, isAuthenticated, addToWishlist, removeFromWishlist } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const allMovies = getAllMovies();
  // Only show 5 featured movies in the carousel
  const featuredMovies: Movie[] = allMovies.slice(0, 5);
  // Show only 4 trending movies with highest ratings
  const trendingMovies: Movie[] = [...allMovies]
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 4);
  // Show only 3 upcoming movies that have future release dates
  const upcomingMovies: Movie[] = allMovies
    .filter((movie: Movie) => new Date(movie.releaseDate) > new Date())
    .slice(0, 3);

  const genres = [
    'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 
    'Thriller', 'Sci-Fi', 'Adventure'
  ];

  const offers = [
    {
      id: 1,
      title: 'First Booking Offer',
      description: 'Get flat 20% off on your first booking',
      code: 'FIRST20',
      validTill: '2024-01-31'
    },
    {
      id: 2,
      title: 'Weekend Special',
      description: 'Book 4 tickets and get 1 free',
      code: 'WEEKEND5',
      validTill: '2024-02-28'
    },
    {
      id: 3,
      title: 'Student Discount',
      description: '15% off with valid student ID',
      code: 'STUDENT15',
      validTill: '2024-03-31'
    }
  ];

  // Handle movie card click
  const handleMovieClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  // Handle wishlist toggle
  const handleWishlist = (movieId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (userProfile?.wishlist.includes(movieId)) {
      removeFromWishlist(movieId);
    } else {
      addToWishlist(movieId);
    }
  };

  // Handle genre selection
  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre === selectedGenre ? null : genre);
  };

  // Handle booking
  const handleBooking = (movieId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/movie/${movieId}`);  
  };

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 8, sm: 9, md: 10 } }}>
      {/* Hero Section with Carousel */}
      <Carousel
        animation="fade"
        autoPlay
        interval={5000}
        indicators={true}
        navButtonsAlwaysVisible
        sx={{ 
          minHeight: { xs: '50vh', sm: '70vh' },
          '& .MuiIconButton-root': {
            color: 'secondary.main',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }
          }
        }}
      >
        {featuredMovies.map((movie: Movie, index: number) => (
          <Paper
            key={movie.id}
            sx={{
              position: 'relative',
              backgroundColor: 'grey.800',
              color: '#fff',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage: `url(${movie.posterUrl})`,
              minHeight: { xs: '50vh', sm: '70vh' },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,.5)',
              }}
            />
            <Container
              sx={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                pt: { xs: 3, sm: 6 },
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                color="common.white"
                sx={{ 
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
                  mb: 2
                }}
              >
                {movie.title}
              </Typography>
              <Typography
                variant="h3"
                color="common.white"
                paragraph
                sx={{ 
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  display: { xs: 'none', sm: 'block' },
                  mb: 3,
                  fontWeight: 400
                }}
              >
                {movie.description}
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => handleBooking(movie.id)}
                  sx={{ mr: 2, mb: { xs: 1, sm: 0 } }}
                >
                  Book Tickets
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  startIcon={<PlayCircleOutline />}
                  sx={{
                    borderColor: 'common.white',
                    color: 'common.white',
                    '&:hover': {
                      borderColor: 'secondary.light',
                      color: 'secondary.light',
                    }
                  }}
                >
                  Watch Trailer
                </Button>
              </Box>
            </Container>
          </Paper>
        ))}
      </Carousel>

      {/* Genres Section */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ mb: 3, color: 'text.primary' }}>
          Browse by Genre
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
          {genres.map((genre) => (
            <Chip
              key={genre}
              label={genre}
              clickable
              color={selectedGenre === genre ? 'secondary' : 'default'}
              onClick={() => handleGenreSelect(genre)}
              sx={{ 
                m: 0.5,
                '&.MuiChip-root': {
                  borderRadius: 2,
                  transition: theme.custom.transitions.smooth,
                }
              }}
            />
          ))}
        </Box>
      </Container>

      {/* Trending Movies Section */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ color: 'text.primary' }}>
          Trending Now
        </Typography>
        <Box sx={{ position: 'relative', my: 2 }}>
          <Grid container spacing={2}>
            {trendingMovies.map((movie: Movie) => (
              <Grid item xs={6} sm={4} md={3} key={movie.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    transition: theme.custom.transitions.smooth,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.custom.shadows.card
                    }
                  }}
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <CardMedia
                    component="img"
                    height={isMobile ? 200 : 300}
                    image={movie.posterUrl}
                    alt={movie.title}
                  />
                  <CardContent sx={{ pb: 1 }}>
                    <Typography variant="subtitle1" noWrap sx={{ color: 'text.primary', fontWeight: 500 }}>
                      {movie.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={Number(movie.rating) / 2} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {movie.rating}/10
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <IconButton 
                      size="small" 
                      onClick={(e) => handleWishlist(movie.id, e)}
                    >
                      {userProfile?.wishlist.includes(movie.id) ? (
                        <Favorite color="error" />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                    <Button 
                      size="small"
                      color="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBooking(movie.id);
                      }}
                      sx={{
                        ml: 'auto'
                      }}
                    >
                      Book Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Offers Section */}
      <Container sx={{ mt: 6, mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ color: 'text.primary' }}>
          Exclusive Offers
        </Typography>
        <Grid container spacing={3}>
          {offers.map((offer) => (
            <Grid item xs={12} sm={6} md={4} key={offer.id}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.secondary.main} 90%)`,
                  color: 'common.white',
                  transition: theme.custom.transitions.smooth,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.custom.shadows.card
                  }
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {offer.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {offer.description}
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                  <Typography variant="subtitle2">
                    Use code: {offer.code}
                  </Typography>
                  <Typography variant="caption">
                    Valid till: {new Date(offer.validTill).toLocaleDateString()}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Upcoming Movies Section */}
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Upcoming Movies
          </Typography>
          <Button
            endIcon={<ChevronRight />}
            onClick={() => navigate('/movies')}
            sx={{ textTransform: 'none' }}
          >
            See All
          </Button>
        </Box>
        <Grid container spacing={3}>
          {upcomingMovies.map((movie: Movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height={isMobile ? 200 : 300}
                  image={movie.posterUrl}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="subtitle1" noWrap>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Release Date: {movie.releaseDate}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="secondary" startIcon={<PlayCircleOutline />}>
                    Trailer
                  </Button>
                  <Button size="small" color="secondary">
                    Remind Me
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
