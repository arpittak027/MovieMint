/**
 * MovieDetails Component
 * Displays detailed information about a specific movie and handles booking functionality
 * Features:
 * - Movie information display (title, description, cast, etc.)
 * - Wishlist functionality
 * - Hall and showtime selection
 * - Booking initiation
 * - Trailer and reminder functionality
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  Grid,
  Divider,
  Paper,
  IconButton,
  Chip,
  Container,
  Avatar,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { Movie } from '../../types/movieTypes';
import { getMovieById } from '../../data/moviesData';
import TrailerModal from '../../components/TrailerModal/TrailerModal';
import ReminderDialog from '../../components/ReminderDialog/ReminderDialog';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Notifications from '@mui/icons-material/Notifications';

/**
 * MovieDetails Component
 * @returns JSX.Element
 */
const MovieDetails = () => {
  // Router hooks for navigation and getting movie ID
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Authentication context for user-related functions
  const { userProfile, isAuthenticated, addToWishlist, removeFromWishlist } = useAuth();
  
  // Local state management
  const [movie, setMovie] = React.useState<Movie | undefined>(undefined);
  const [selectedHall, setSelectedHall] = React.useState('');
  const [selectedShowtime, setSelectedShowtime] = React.useState('');
  const [trailerOpen, setTrailerOpen] = React.useState(false);
  const [reminderOpen, setReminderOpen] = React.useState(false);

  // Fetch movie data on component mount
  React.useEffect(() => {
    if (id) {
      const foundMovie = getMovieById(id);
      if (foundMovie) {
        console.log('Found movie:', foundMovie); // Add logging for debugging
        setMovie(foundMovie);
      }
    }
  }, [id]);
  
  // Check if movie is in user's wishlist
  const isInWishlist = userProfile?.wishlist?.includes(movie?.id || '') || false;

  // Check if the movie is upcoming
  const isUpcoming = movie?.id.startsWith('upcoming-');

  /**
   * Handles adding/removing movie from wishlist
   * Redirects to login if user is not authenticated
   */
  const handleWishlist = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!movie) {
      return;
    }
    
    if (isInWishlist) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie.id);
    }
  };

  /**
   * Handles the booking process
   * - Validates authentication
   * - Checks for hall and showtime selection
   * - Navigates to booking page with selected details
   */
  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!selectedHall || !selectedShowtime) {
      alert('Please select both hall and showtime before booking');
      return;
    }

    navigate(`/booking/${movie?.id}`, {
      state: {
        hallName: selectedHall,
        showtime: {
          date: new Date().toISOString().split('T')[0],
          showTimes: [selectedShowtime],
          price: {
            standard: 150,
            vip: 250,
            premium: 350
          }
        },
        movieTitle: movie?.title
      }
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Image failed to load in MovieDetails:', movie?.posterUrl);
    e.currentTarget.src = 'https://via.placeholder.com/500x750?text=Movie+Poster+Not+Available';
  };

  // Show error message if movie is not found
  if (!movie) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center'
        }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Movie Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Sorry, we couldn't find the movie you're looking for.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/movies')}
            sx={{ mt: 2 }}
          >
            Back to Movies
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Trailer Modal */}
      {movie?.trailerUrl && (
        <TrailerModal
          open={trailerOpen}
          onClose={() => setTrailerOpen(false)}
          trailerUrl={movie.trailerUrl}
        />
      )}

      {/* Reminder Dialog */}
      {isUpcoming && movie && (
        <ReminderDialog
          open={reminderOpen}
          onClose={() => setReminderOpen(false)}
          movie={movie}
        />
      )}

      <Grid container spacing={4}>
        {/* Movie Poster Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            position: 'sticky',
            top: '2rem',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <CardMedia
              component="img"
              image={movie.posterUrl}
              alt={movie.title}
              onError={handleImageError}
              sx={{ 
                width: '100%',
                height: '100%',
                minHeight: '400px',
                objectFit: 'cover'
              }}
            />
          </Card>
        </Grid>

        {/* Movie Details Section */}
        <Grid item xs={12} md={8}>
          {/* Title and Actions */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            mb: 2,
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="h4" 
                component="h1"
                sx={{ 
                  fontWeight: 'bold',
                  color: 'text.primary',
                  mb: 1
                }}
              >
                {movie.title}
              </Typography>
              {isUpcoming && (
                <Chip 
                  label="Coming Soon" 
                  color="secondary" 
                  sx={{ mr: 1 }}
                />
              )}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {movie.trailerUrl && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setTrailerOpen(true)}
                  startIcon={<PlayArrow />}
                >
                  Watch Trailer
                </Button>
              )}
              {isUpcoming && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setReminderOpen(true)}
                  startIcon={<Notifications />}
                >
                  Remind Me
                </Button>
              )}
              <IconButton 
                onClick={handleWishlist}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                {isInWishlist ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
            </Box>
          </Box>

          {/* Basic Information */}
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ mb: 3 }}
          >
            {movie.language} | {movie.duration} mins | {movie.category}
          </Typography>

          {/* Description */}
          <Typography 
            variant="body1" 
            paragraph
            sx={{ 
              mb: 3,
              lineHeight: 1.7
            }}
          >
            {movie.description}
          </Typography>

          {/* Cast and Director */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>Cast & Crew</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {movie.cast.map((actor, index) => (
                <Chip
                  key={index}
                  label={actor}
                  variant="outlined"
                />
              ))}
            </Box>
            <Typography variant="body1">
              <strong>Director:</strong> {movie.director}
            </Typography>
          </Box>

          {/* Release Date */}
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}
          </Typography>

          {/* Booking Section - Only show if not upcoming */}
          {!isUpcoming && (
            <>
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Book Tickets</Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Select Cinema Hall</InputLabel>
                  <Select
                    value={selectedHall}
                    onChange={(e) => setSelectedHall(e.target.value)}
                    label="Select Cinema Hall"
                  >
                    <MenuItem value="hall1">PVR Cinemas - Phoenix Mall</MenuItem>
                    <MenuItem value="hall2">INOX - R City Mall</MenuItem>
                    <MenuItem value="hall3">Cinepolis - Thane</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Select Showtime</InputLabel>
                  <Select
                    value={selectedShowtime}
                    onChange={(e) => setSelectedShowtime(e.target.value)}
                    label="Select Showtime"
                  >
                    <MenuItem value="10:00">10:00 AM</MenuItem>
                    <MenuItem value="13:00">1:00 PM</MenuItem>
                    <MenuItem value="16:00">4:00 PM</MenuItem>
                    <MenuItem value="19:00">7:00 PM</MenuItem>
                    <MenuItem value="22:00">10:00 PM</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={handleBooking}
                >
                  Book Now
                </Button>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetails;
