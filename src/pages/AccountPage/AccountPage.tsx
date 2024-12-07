import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Divider,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  Card,
  CardContent,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AccountPage = () => {
  const { userProfile, updateProfile } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userProfile?.name || '',
    phone: userProfile?.phone || '',
  });

  if (!userProfile) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5">Please log in to view your account</Typography>
      </Container>
    );
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditClick = () => {
    setEditForm({
      name: userProfile.name,
      phone: userProfile.phone,
    });
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
  };

  const handleEditSubmit = () => {
    updateProfile({
      name: editForm.name,
      phone: editForm.phone,
    });
    setOpenEditDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Profile" />
            <Tab label="Booking History" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Profile Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <strong>Name:</strong> {userProfile.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <strong>Email:</strong> {userProfile.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <strong>Phone:</strong> {userProfile.phone || 'Not provided'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleEditClick}
                  sx={{ mt: 2 }}
                >
                  Edit Profile
                </Button>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h5" gutterBottom>
            Booking History
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {userProfile.bookingHistory.length === 0 ? (
              <Grid item xs={12}>
                <Typography>No booking history available</Typography>
              </Grid>
            ) : (
              userProfile.bookingHistory.map((booking) => (
                <Grid item xs={12} key={booking.bookingId}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {booking.movieTitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Booking ID: {booking.bookingId}
                      </Typography>
                      <Typography variant="body2">
                        Show Time: {booking.showtime}
                      </Typography>
                      <Typography variant="body2">
                        Seats: {booking.selectedSeats.map(seat => seat.id).join(', ')}
                      </Typography>
                      <Typography variant="body2">
                        Amount: ₹{booking.totalAmount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Booked on: {new Date(booking.bookingDate).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </TabPanel>
      </Paper>

      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={editForm.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone Number"
            type="tel"
            fullWidth
            value={editForm.phone}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AccountPage;
