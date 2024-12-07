import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
} from '@mui/material';

interface Seat {
  row: number;
  number: number;
}

interface PaymentFormProps {
  amount: number;
  movieTitle: string;
  selectedSeats: Seat[];
  showtime: string;
  hallName: string;
  paymentMethod: string;
  paymentGateway: string;
  onPaymentSuccess: (paymentInfo: any) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  movieTitle,
  selectedSeats,
  showtime,
  hallName,
  paymentMethod,
  paymentGateway,
  onPaymentSuccess,
}) => {
  const { userProfile, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    phone: userProfile?.phone || '',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [useExistingPhone, setUseExistingPhone] = useState(Boolean(userProfile?.phone));

  useEffect(() => {
    if (userProfile?.phone && useExistingPhone) {
      setFormData(prev => ({
        ...prev,
        phone: userProfile.phone
      }));
    }
  }, [userProfile?.phone, useExistingPhone]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmPayment = () => {
    // If this is a new phone number, update the user's profile
    if (formData.phone && (!userProfile?.phone || formData.phone !== userProfile.phone)) {
      updateProfile({ phone: formData.phone });
    }

    const paymentInfo = {
      ...formData,
      paymentId: `PAY${Date.now()}`,
      timestamp: new Date().toISOString(),
      amount,
      paymentMethod,
      paymentGateway,
    };
    onPaymentSuccess(paymentInfo);
    setShowConfirmation(false);
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Payment Details
        </Typography>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          Amount to Pay: ₹{amount}
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {userProfile?.phone && (
                <Box sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={useExistingPhone}
                        onChange={(e) => {
                          setUseExistingPhone(e.target.checked);
                          if (!e.target.checked) {
                            setFormData(prev => ({ ...prev, phone: '' }));
                          }
                        }}
                      />
                    }
                    label="Use saved phone number"
                  />
                </Box>
              )}
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                disabled={useExistingPhone}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
                inputProps={{ maxLength: 16 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Card Holder Name"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Expiry Date"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleInputChange}
                required
                inputProps={{ maxLength: 5 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="CVV"
                name="cvv"
                type="password"
                value={formData.cvv}
                onChange={handleInputChange}
                required
                inputProps={{ maxLength: 3 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
              >
                Pay ₹{amount}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)}>
        <DialogTitle>Confirm Payment</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Please confirm your payment details:
          </Typography>
          <Typography variant="body2">
            Amount: ₹{amount}
          </Typography>
          <Typography variant="body2">
            Card Number: **** **** **** {formData.cardNumber.slice(-4)}
          </Typography>
          <Typography variant="body2">
            Phone: {formData.phone}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmation(false)}>Cancel</Button>
          <Button onClick={handleConfirmPayment} variant="contained">
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentForm;
