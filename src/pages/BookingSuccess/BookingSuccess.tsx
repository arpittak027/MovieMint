import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Divider,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state as any;

  if (!bookingDetails) {
    navigate('/');
    return null;
  }

  const {
    bookingId,
    movieTitle,
    showtime,
    selectedSeats,
    totalAmount,
    paymentInfo,
  } = bookingDetails;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <CheckCircleOutlineIcon
            color="success"
            sx={{ fontSize: 64, mb: 2 }}
          />
          <Typography variant="h4" gutterBottom>
            Booking Confirmed!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Booking ID: {bookingId}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Movie Details</Typography>
            <Typography variant="body1">{movieTitle}</Typography>
            <Typography variant="body2" color="text.secondary">
              Show Time: {showtime}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Seat Details</Typography>
            <Typography variant="body1">
              Seats: {selectedSeats.map((seat: any) => seat.id).join(', ')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Amount: ₹{totalAmount}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Payment Details</Typography>
            <Typography variant="body2">
              Payment ID: {paymentInfo.paymentId}
            </Typography>
            <Typography variant="body2">
              Card Number: **** **** **** {paymentInfo.cardNumber.slice(-4)}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
          <Button
            variant="outlined"
            onClick={() => window.print()}
          >
            Print Ticket
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookingSuccess;
