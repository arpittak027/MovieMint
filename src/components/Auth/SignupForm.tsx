import React, { useState } from 'react';
import {
  Container, Paper, Typography, TextField,
  Button, Box, Link, Alert,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * SignupForm Component
 * Handles user registration with form validation and error handling
 */
const SignupForm = () => {
  // Hooks
  const navigate = useNavigate();
  const { signup } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  // Validation rules
  const validations = {
    name: (value: string) => value.trim() ? '' : 'Name is required',
    email: (value: string) => {
      if (!value.trim()) return 'Email is required';
      if (!value.includes('@')) return 'Please enter a valid email address';
      return '';
    },
    password: (value: string) => 
      value.length < 6 ? 'Password must be at least 6 characters long' : '',
    confirmPassword: (value: string) => 
      value !== formData.password ? 'Passwords do not match' : ''
  };

  // Event handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    for (const [field, validate] of Object.entries(validations)) {
      const errorMessage = validate(formData[field as keyof typeof formData]);
      if (errorMessage) {
        setError(errorMessage);
        return;
      }
    }

    try {
      await signup(formData.email, formData.password, formData.name);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    }
  };

  // Form fields configuration
  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
  ];

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Sign Up
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {fields.map(({ name, label, type }) => (
            <TextField
              key={name}
              fullWidth
              label={label}
              name={name}
              type={type}
              value={formData[name as keyof typeof formData]}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          ))}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Box textAlign="center">
            <Link component={RouterLink} to="/login" variant="body2">
              Already have an account? Log in
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupForm;
