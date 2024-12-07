import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import { Movie } from '../../types/movieTypes';

interface ReminderDialogProps {
  open: boolean;
  onClose: () => void;
  movie: Movie;
}

const ReminderDialog: React.FC<ReminderDialogProps> = ({ open, onClose, movie }) => {
  const [reminderTime, setReminderTime] = React.useState('1day');

  const handleSetReminder = () => {
    const releaseDate = new Date(movie.releaseDate);
    let notificationTime: Date;

    switch (reminderTime) {
      case '1day':
        notificationTime = new Date(releaseDate.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '3days':
        notificationTime = new Date(releaseDate.getTime() - 3 * 24 * 60 * 60 * 1000);
        break;
      case '1week':
        notificationTime = new Date(releaseDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      default:
        notificationTime = new Date(releaseDate.getTime() - 24 * 60 * 60 * 1000);
    }

    // Request notification permission
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          // Store reminder in localStorage
          const reminders = JSON.parse(localStorage.getItem('movieReminders') || '[]');
          reminders.push({
            movieId: movie.id,
            movieTitle: movie.title,
            releaseDate: movie.releaseDate,
            notificationTime: notificationTime.toISOString(),
          });
          localStorage.setItem('movieReminders', JSON.stringify(reminders));

          // Schedule notification
          const timeUntilNotification = notificationTime.getTime() - new Date().getTime();
          if (timeUntilNotification > 0) {
            setTimeout(() => {
              new Notification('Movie Release Reminder', {
                body: `${movie.title} is releasing in ${reminderTime === '1day' ? 'one day' : 
                  reminderTime === '3days' ? 'three days' : 'one week'}!`,
                icon: movie.posterUrl,
              });
            }, timeUntilNotification);
          }
        }
      });
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Set Release Reminder</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">
            {movie.title} releases on {new Date(movie.releaseDate).toLocaleDateString()}
          </Typography>
        </Box>
        <FormControl fullWidth>
          <InputLabel>Remind Me</InputLabel>
          <Select
            value={reminderTime}
            label="Remind Me"
            onChange={(e) => setReminderTime(e.target.value)}
          >
            <MenuItem value="1day">1 day before release</MenuItem>
            <MenuItem value="3days">3 days before release</MenuItem>
            <MenuItem value="1week">1 week before release</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSetReminder} variant="contained" color="primary">
          Set Reminder
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReminderDialog;
