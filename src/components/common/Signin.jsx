import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Snackbar,
  Alert,
  Stack
} from '@mui/material'

export const Signin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' })

  const showSnackbar = (message, severity = 'success') => {
    setSnack({ open: true, message, severity })
  }

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return
    setSnack({ ...snack, open: false })
  }

  const submit = async (data) => {
    try {
      const res = await axios.post("/user/login", data)

      if (res.status === 200) {
        showSnackbar("Login Success", "success")

        localStorage.setItem("id", res.data.data._id)
        localStorage.setItem("role", res.data.data.roleId.name)

        setTimeout(() => {
          const role = res.data.data.roleId.name
          if (role === "User") navigate("/")
          else if (role === "Owner") navigate("/dashboard")
          else showSnackbar("Unknown role", "error")
        }, 1500)
      }
    } catch (error) {
      showSnackbar("Login failed. Please check your credentials.", "error")
    }
  }

  const validator = {
    email: {
      required: "Email is required",
      minLength: { value: 5, message: "Min 5 characters" },
      pattern: {
        value: /([a-zA-Z0-9_.-]+@[a-zA-Z-]+\.[a-zA-Z]+)|(^[5-9][\d]?[0-9]{8}\b)/,
        message: "Invalid email or phone number"
      }
    },
    password: {
      required: "Password is required",
      minLength: { value: 8, message: "Min 8 characters" }
    }
  }

  return (
    <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center" bgcolor="#f7f7f7" px={2}>
      <Paper elevation={4} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: 5 }}>
        <form onSubmit={handleSubmit(submit)}>
          <Stack spacing={3}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Sign In
            </Typography>

            <TextField
              label="Email or Phone"
              fullWidth
              variant="outlined"
              {...register("email", validator.email)}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              {...register("password", validator.password)}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ borderRadius: 2 }}
            >
              Login
            </Button>

            <Typography variant="body2" textAlign="center">
              <Link to="/reset" style={{ textDecoration: 'none' }}>Forgot password?</Link>
            </Typography>

            <Typography variant="body2" textAlign="center">
              Don't have an account? <Link to="/signup" style={{ textDecoration: 'none' }}>Sign up</Link>
            </Typography>
          </Stack>
        </form>
      </Paper>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snack.severity} onClose={handleClose} variant="filled" sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
