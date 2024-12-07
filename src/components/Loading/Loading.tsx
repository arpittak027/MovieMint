import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * Loading Component Props
 * @property {string} message - Optional loading message to display
 */
interface LoadingProps {
  message?: string;
}

/**
 * Loading Component
 * Displays a centered loading spinner with an optional message
 */
const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px',
    },
    spinner: {
      color: 'secondary.main',
      mb: 2
    }
  };

  return (
    <Box sx={styles.container}>
      <CircularProgress size={40} thickness={4} sx={styles.spinner} />
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;
