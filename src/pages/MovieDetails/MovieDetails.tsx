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

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userProfile, isAuthenticated, addToWishlist, removeFromWishlist } = useAuth();
  
  const [movie, setMovie] = React.useState<Movie | undefined>(undefined);
  const [selectedHall, setSelectedHall] = React.useState('');
  const [selectedShowtime, setSelectedShowtime] = React.useState('');

  React.useEffect(() => {
    if (id) {
      const foundMovie = getMovieById(id);
      setMovie(foundMovie);
    }
  }, [id]);
  
  const isInWishlist = userProfile?.wishlist?.includes(movie?.id || '') || false;

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

  // If movie is not found, show error message
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
      <Grid container spacing={4}>
        {/* Movie Poster */}
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
              sx={{ 
                height: 0,
                paddingTop: '150%',
                objectFit: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </Card>
        </Grid>

        {/* Movie Details */}
        <Grid item xs={12} md={8}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            mb: 2
          }}>
            <Typography 
              variant="h4" 
              component="h1"
              sx={{ 
                fontWeight: 'bold',
                color: 'text.primary'
              }}
            >
              {movie.title}
            </Typography>
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

          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ mb: 3 }}
          >
            {movie.language} | {movie.duration} mins | {movie.category}
          </Typography>

          <Box sx={{ my: 3 }}>
            <Typography 
              variant="body1" 
              paragraph
              sx={{ 
                lineHeight: 1.7,
                color: 'text.secondary'
              }}
            >
              {movie.description}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>Cast</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {movie.cast.map((actor, index) => (
              <Chip key={index} label={actor} variant="outlined" />
            ))}
          </Box>

          <Typography variant="h6" gutterBottom>Director</Typography>
          <Typography variant="body1" paragraph>{movie.director}</Typography>

          <Typography variant="h6" gutterBottom>Release Date</Typography>
          <Typography variant="body1" paragraph>
            {new Date(movie.releaseDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>

          {movie.genres && (
            <>
              <Typography variant="h6" gutterBottom>Genres</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {movie.genres.map((genre, index) => (
                  <Chip key={index} label={genre} color="primary" variant="outlined" />
                ))}
              </Box>
            </>
          )}

          {/* Showtimes and Booking Section */}
          <Divider sx={{ my: 3 }} />
          <Typography variant="h5" gutterBottom>
            Book Tickets
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Hall</InputLabel>
                  <Select
                    value={selectedHall}
                    label="Select Hall"
                    onChange={(e) => setSelectedHall(e.target.value)}
                  >
                    <MenuItem value="Hall A">Hall A</MenuItem>
                    <MenuItem value="Hall B">Hall B</MenuItem>
                    <MenuItem value="Hall C">Hall C</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Showtime</InputLabel>
                  <Select
                    value={selectedShowtime}
                    label="Select Showtime"
                    onChange={(e) => setSelectedShowtime(e.target.value)}
                  >
                    <MenuItem value="10:00 AM">10:00 AM</MenuItem>
                    <MenuItem value="2:00 PM">2:00 PM</MenuItem>
                    <MenuItem value="6:00 PM">6:00 PM</MenuItem>
                    <MenuItem value="9:00 PM">9:00 PM</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handleBooking}
                  disabled={!selectedHall || !selectedShowtime}
                  sx={{ mt: 2 }}
                >
                  Book Now
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Reviews Section */}
          <Divider sx={{ my: 3 }} />
          <Typography variant="h5" gutterBottom>
            Reviews
          </Typography>
          {movie.reviews && movie.reviews.length > 0 ? (
            <Box sx={{ mt: 2 }}>
              {movie.reviews.map((review) => (
                <Paper
                  key={review.id}
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    borderRadius: '8px'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      {review.userId.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                        {review.userId}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(review.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                  <Rating value={review.rating} readOnly precision={0.1} sx={{ mb: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    {review.comment}
                  </Typography>
                </Paper>
              ))}
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary">
              No reviews yet.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetails;
