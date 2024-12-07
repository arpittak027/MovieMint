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
  CardActionArea
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Movie } from '../../types/movieTypes';
import { useAuth } from '../../context/AuthContext';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const { userProfile, isAuthenticated, addToWishlist, removeFromWishlist } = useAuth();
  
  const isInWishlist = userProfile?.wishlist?.includes(movie.id) || false;
  // Convert rating string to number and ensure it's between 0-5
  const rating = parseFloat(movie.rating);
  const ratingValue = isNaN(rating) ? 0 : rating;

  const averageRating = movie.reviews && movie.reviews.length > 0
    ? (movie.reviews.reduce((sum, review) => sum + review.rating, 0) / movie.reviews.length).toFixed(1)
    : movie.rating;

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (isInWishlist) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie.id);
    }
  };

  return (
    <Card sx={{ 
      maxWidth: 345, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      '&:hover': {
        transform: 'scale(1.02)',
        transition: 'transform 0.2s ease-in-out'
      }
    }}>
      <CardActionArea 
        onClick={() => navigate(`/movie/${movie.id}`)}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <CardMedia
          component="img"
          sx={{
            height: 0,
            paddingTop: '150%', // 2:3 aspect ratio
            objectFit: 'cover',
            backgroundPosition: 'center'
          }}
          image={movie.posterUrl}
          alt={movie.title}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            height: '100%'
          }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography 
                gutterBottom 
                variant="h6" 
                component="div" 
                sx={{ 
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: 1.2,
                  height: '2.4em'
                }}
              >
                {movie.title}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 1 }}
              >
                {movie.language} | {movie.category}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                <Rating 
                  value={parseFloat(averageRating)} 
                  readOnly 
                  precision={0.1} 
                  size="small"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({averageRating})
                </Typography>
              </Box>
            </Box>
            <IconButton 
              onClick={(e) => {
                e.stopPropagation();
                handleWishlist(e);
              }}
              sx={{ 
                ml: 1,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              {isInWishlist ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
