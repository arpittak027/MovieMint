import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Rating,
  CardActionArea,
  Button
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Movie } from '../../types/movieTypes';
import { useAuth } from '../../context/AuthContext';

// Component Props Interface
interface MovieCardProps {
  movie: Movie;
}

/**
 * MovieCard Component
 * Displays a movie card with poster, title, rating, and booking options
 * Handles wishlist functionality and navigation to movie details
 */
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  // Hooks and Authentication
  const navigate = useNavigate();
  const { userProfile, isAuthenticated, addToWishlist, removeFromWishlist } = useAuth();

  // Computed Properties
  const isInWishlist = userProfile?.wishlist?.includes(movie.id) || false;
  const isUpcoming = movie.id.startsWith('upcoming-');
  const ratingValue = isNaN(Number(movie.rating)) ? 0 : Number(movie.rating);
  const averageRating = movie.reviews?.length
    ? movie.reviews.reduce((acc, review) => acc + review.rating, 0) / movie.reviews.length
    : ratingValue;

  // Event Handlers
  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) return navigate('/login');
    isInWishlist ? removeFromWishlist(movie.id) : addToWishlist(movie.id);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/500x750?text=Movie+Poster+Not+Available';
  };

  // Styles
  const cardStyles = {
    maxWidth: 345,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      transform: 'scale(1.02)',
      transition: 'transform 0.2s ease-in-out'
    }
  };

  return (
    <Card sx={cardStyles}>
      <CardActionArea
        onClick={() => navigate(`/movie/${movie.id}`)}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        {/* Movie Poster Section */}
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            sx={{ width: '100%', height: '400px', objectFit: 'cover' }}
            image={movie.posterUrl}
            alt={movie.title}
            onError={handleImageError}
          />
          {isUpcoming && (
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                bgcolor: 'secondary.main',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}
            >
              Coming Soon
            </Box>
          )}
        </Box>

        {/* Movie Details Section */}
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {movie.language} | {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.category}
          </Typography>

          {/* Rating and Wishlist Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
            <Rating value={averageRating} readOnly precision={0.1} size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({averageRating.toFixed(1)})
            </Typography>
            <IconButton
              onClick={handleWishlist}
              sx={{ ml: 1, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
            >
              {isInWishlist ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          </Box>

          {/* Booking Button */}
          {!isUpcoming && (
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/movie/${movie.id}`);
              }}
            >
              Book Now
            </Button>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
