import React from 'react'
import { useForm } from 'react-hook-form'
import { Box, Paper, Typography, TextField, Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

export const Forgot = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const submit = (data) => {
    console.log('data', data)
  }

  const validator = {
    user: {
      required: {
        value: true,
        message: "Field is required"
      },
      minLength: {
        value: 5,
        message: "Min length is 8 characters"
      },
      pattern: {
        value: /([a-zA-Z0-9_.-]+@[a-zA-Z-]+\.[a-zA-Z]+)|(^[5-9][\d]?[0-9]{8}\b)/,
        message: "Invalid email or phone number"
      }
    }
  }

  return (
    <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center" bgcolor="#f7f7f7" px={2}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: 5 }}>
        <form onSubmit={handleSubmit(submit)}>
          <Stack spacing={3}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Forgot Password?
            </Typography>

            <Typography variant="body2" color="textSecondary" textAlign="center">
              Enter your email, phone, or username and we'll send you a link to get back into your account.
            </Typography>

            <TextField
              label="Phone number, username, or email"
              fullWidth
              variant="outlined"
              {...register("user", validator.user)}
              error={Boolean(errors.user)}
              helperText={errors.user?.message}
            />

            <Button type="submit" variant="contained" fullWidth size="large" sx={{ borderRadius: 2 }}>
              Send login link
            </Button>

            <Typography variant="body2" textAlign="center">
              <Link to="/login" style={{ textDecoration: 'none' }}>
                Back to Login
              </Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Box>
  )
}
