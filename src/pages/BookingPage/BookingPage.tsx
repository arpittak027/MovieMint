/**
 * BookingPage Component
 * Handles the movie ticket booking process including:
 * - Seat selection interface
 * - Price calculation
 * - Payment processing
 * - Booking confirmation
 */

import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Box,
  Chip,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Movie, Seat, MovieShowtime } from '../../types/movieTypes';
import { movies } from '../../data/moviesData';
import PaymentForm from '../../components/Payment/PaymentForm';

// Constants for different seat types and their characteristics
const SEAT_TYPES = {
  STANDARD: 'standard',
  VIP: 'vip',
  PREMIUM: 'premium',
} as const;

// Type definitions for location state passed from MovieDetails
interface LocationState {
  hallName: string;
  showtime: MovieShowtime;
  movieTitle: string;
}

// Type definitions for payment form props
interface PaymentFormProps {
  amount: number;
  movieTitle: string;
  selectedSeats: Seat[];
  showtime: string;
  hallName: string;
  paymentMethod?: string;
  paymentGateway?: string;
  onPaymentSuccess?: (paymentInfo: any) => void;
}

/**
 * Generates a grid of seats for the cinema hall
 * @param showtime - Contains information about the show timing and pricing
 * @returns Array of seats with their properties (type, price, booking status)
 */
const generateSeats = (showtime: MovieShowtime): Seat[] => {
  const newSeats: Seat[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  // Default prices if not provided
  const prices = showtime?.price || {
    standard: 150,
    vip: 250,
    premium: 350
  };

  rows.forEach((rowLetter, rowIndex) => {
    for (let number = 1; number <= 10; number++) {
      // Determine seat type based on position
      const seatType = number <= 3 
        ? SEAT_TYPES.STANDARD 
        : number <= 7 
          ? SEAT_TYPES.VIP 
          : SEAT_TYPES.PREMIUM;

      // Set price based on seat type
      const price = seatType === SEAT_TYPES.STANDARD 
        ? prices.standard 
        : seatType === SEAT_TYPES.VIP 
          ? prices.vip 
          : prices.premium;

      newSeats.push({
        id: `${rowLetter}${number}`,
        row: rowIndex + 1,  
        number,
        type: seatType,
        isBooked: false,
        price
      });
    }
  });

  return newSeats;
};

const BookingPage = () => {
  // Router and navigation hooks
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Authentication context
  const { isAuthenticated, userProfile, addBooking } = useAuth();
  
  // Local state management
  const [activeStep, setActiveStep] = useState(0);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Get movie and booking details from location state
  const movie = movies.find((m: Movie) => m.id === id);
  const { hallName, showtime, movieTitle } = (location.state as LocationState) || {};

  // Authentication and data validation check
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!hallName || !showtime) {
      navigate(`/movie/${id}`);
      return;
    }

    if (movie && showtime) {
      const newSeats = generateSeats(showtime);
      setSeats(newSeats);
      setSelectedShowtime(showtime.showTimes[0]);
    }
  }, [movie, isAuthenticated, navigate, hallName, showtime, id]);

  /**
   * Handles seat selection/deselection
   * @param seat - The seat being clicked
   */
  const handleSeatClick = (seat: Seat) => {
    if (seat.isBooked) return;

    const isSeatSelected = selectedSeats.find(s => s.id === seat.id);
    if (isSeatSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  /**
   * Handles the payment success callback
   * Creates a booking record and navigates to success page
   */
  const handlePaymentSuccess = (paymentInfo: any) => {
    const bookingDetails = {
      bookingId: `BK${Date.now()}`,
      movieTitle,
      showtime: selectedShowtime,
      selectedSeats,
      totalAmount: selectedSeats.reduce((sum, seat) => sum + seat.price, 0),
      paymentInfo,
      bookingDate: new Date().toISOString(),
    };
    
    addBooking(bookingDetails);
    setBookingComplete(true);
    navigate('/booking-success', { state: { booking: bookingDetails } });
  };

  // Calculate total amount for selected seats
  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const steps = ['Select Showtime', 'Choose Seats', 'Payment'];

  const handleShowtimeChange = (event: SelectChangeEvent<string>) => {
    setSelectedShowtime(event.target.value);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Select Showtime</InputLabel>
              <Select
                value={selectedShowtime}
                onChange={handleShowtimeChange}
                label="Select Showtime"
              >
                {showtime.showTimes.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Screen
            </Typography>
            <Paper
              sx={{
                width: '100%',
                height: '8px',
                bgcolor: 'grey.300',
                mb: 4,
              }}
            />
            <Grid container spacing={1} justifyContent="center">
              {seats.map((seat) => (
                <Grid item key={seat.id}>
                  <Button
                    variant={selectedSeats.find(s => s.id === seat.id) ? "contained" : "outlined"}
                    disabled={seat.isBooked}
                    onClick={() => handleSeatClick(seat)}
                    sx={{
                      minWidth: '40px',
                      height: '40px',
                      m: 0.5,
                      bgcolor: seat.isBooked ? 'grey.300' : 'inherit',
                    }}
                  >
                    {seat.id}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Selected Seats: {selectedSeats.map(seat => seat.id).join(', ')}
              </Typography>
              <Typography variant="subtitle1">
                Total: ₹{selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}
              </Typography>
            </Box>
          </Box>
        );
      case 2:
        return (
          <PaymentForm
            amount={selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}
            movieTitle={movieTitle}
            selectedSeats={selectedSeats}
            showtime={selectedShowtime}
            hallName={hallName}
            paymentMethod="Credit Card"
            paymentGateway="Stripe"
            onPaymentSuccess={handlePaymentSuccess}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Book Tickets - {movie?.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {hallName}
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mt: 3, mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent()}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={
              (activeStep === 0 && !selectedShowtime) ||
              (activeStep === 1 && selectedSeats.length === 0)
            }
          >
            {activeStep === steps.length - 1 ? 'Confirm Booking' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookingPage;
