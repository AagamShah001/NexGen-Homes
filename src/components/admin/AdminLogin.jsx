import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert
} from '@mui/material';

export const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Snackbar state
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') => {
    setSnack({ open: true, message, severity });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnack({ ...snack, open: false });
  };

  const submit = async (data) => {
    try {
      const res = await axios.post('/adminlogin', data);
      if (res.status === 200) {
        showSnackbar('Login Success', 'success');
        localStorage.setItem('id', res.data.data._id);
        localStorage.setItem('role', res.data.data.roleId.name);

        setTimeout(() => {
          if (res.data.data.roleId.name === 'Admin') {
            navigate('/adminpanel');
          } else {
            showSnackbar('Unauthorized access', 'error');
          }
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      showSnackbar('Login failed', 'error');
    }
  };

  const validator = {
    user: {
      required: 'Email or phone is required',
      minLength: {
        value: 5,
        message: 'Minimum length is 5 characters',
      },
      pattern: {
        value: /([a-zA-Z0-9_.-]+@[a-zA-Z-]+\.[a-zA-Z]+)|(^[5-9][\d]?[0-9]{8}\b)/,
        message: 'Invalid email or phone number',
      },
    },
    pass: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Minimum length is 8 characters',
      },
    },
  };

  return (
    <Container sx={{ mt: 8, width: 500 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Admin Login
        </Typography>

        <form onSubmit={handleSubmit(submit)} noValidate>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Email or Phone"
              variant="outlined"
              {...register('email', validator.user)}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              {...register('password', validator.pass)}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Box>

          <Button fullWidth type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </Paper>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={snack.severity} variant="filled" sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
