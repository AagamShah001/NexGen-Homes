import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
    Button,
    ButtonGroup,
    Box,
    Snackbar,
    Alert,
    TextField,
    Paper,
    Typography,
    Stack
} from '@mui/material'
import {
    ToggleButtonGroup,
    ToggleButton,
  } from '@mui/material';
  import PersonIcon from '@mui/icons-material/Person';
  import HomeWorkIcon from '@mui/icons-material/HomeWork';
  import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';


export const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedRole, setSelectedRole] = useState('');
    const navigate = useNavigate();
    const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

    const showSnack = (message, severity = 'success') => {
        setSnack({ open: true, message, severity })
    }

    const handleSnackClose = () => {
        setSnack({ ...snack, open: false })
    }

    const roles = {
        'User': '67da9784c1217a5cae4799f4',
        'Owner': '67da9741c1217a5cae4799f2',
        'Broker': '67e216d9b222ea4185215c19'
    }

    const submit = async (data) => {
        if (!selectedRole) {
            showSnack("Please select a role", "error")
            return
        }

        data.roleId = selectedRole
        try {
            const res = await axios.post("/user/adduser", data)
            if (res.status === 201) {
                showSnack("User added successfully", "success")
                setTimeout(() => navigate("/login"), 1500)
            } else {
                showSnack("User not added", "error")
            }
        } catch (error) {
            showSnack("Something went wrong", "error")
        }
    }

    const validator = {
        user: {
            required: { value: true, message: "Field is required" },
            pattern: {
                value: /([a-zA-Z0-9_.-]+@[a-zA-Z-]+\.[a-zA-Z]+)|(^[5-9][\d]?[0-9]{8}\b)/,
                message: "Invalid email or phone number"
            }
        },
        pass: {
            required: { value: true, message: "Password is required" },
            minLength: { value: 8, message: "Min length is 8 characters" }
        },
        fname: {
            required: { value: true, message: "First Name is required" }
        },
        uname: {
            required: { value: true, message: "Last Name is required" }
        }
    }

    return (
        <Box mb={5} display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={2}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 450, borderRadius: 5 }}>
                <Typography variant="h5" align="center" mb={3}>Create an Account</Typography>

                <Box display="flex" justifyContent="center" mb={3}>
  <ToggleButtonGroup
    value={selectedRole}
    exclusive
    onChange={(e, newRole) => {
      if (newRole !== null) setSelectedRole(newRole);
    }}
    color="primary"
    sx={{
      display: 'flex',
      gap: 2,
      '& .MuiToggleButton-root': {
        borderRadius: '20px',
        px: 3,
        py: 1,
        textTransform: 'capitalize',
        fontWeight: 500,
        border: '1px solid #ccc',
        '&.Mui-selected': {
          backgroundColor: '#1976d2',
          color: '#fff',
          borderColor: '#1976d2',
        },
        '&:hover': {
          backgroundColor: '#e3f2fd',
        },
      }
    }}
  >
    <ToggleButton value="67da9784c1217a5cae4799f4">
      <PersonIcon sx={{ mr: 1 }} />
      User
    </ToggleButton>

    <ToggleButton value="67da9741c1217a5cae4799f2">
      <HomeWorkIcon sx={{ mr: 1 }} />
      Owner
    </ToggleButton>

    {/* <ToggleButton value="67e216d9b222ea4185215c19">
      <BusinessCenterIcon sx={{ mr: 1 }} />
      Broker
    </ToggleButton> */}
  </ToggleButtonGroup>
</Box>

                <form onSubmit={handleSubmit(submit)}>
                    <Stack spacing={2}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            {...register('email', validator.user)}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            {...register('password', validator.pass)}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />

                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            {...register('firstname', validator.fname)}
                            error={!!errors.firstname}
                            helperText={errors.firstname?.message}
                        />

                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            {...register('lastname', validator.uname)}
                            error={!!errors.lastname}
                            helperText={errors.lastname?.message}
                        />

                        <Typography variant="body2" color="text.secondary" mt={1}>
                            By selecting Agree and Continue, you agree to our
                            <Link to="#" style={{ textDecoration: 'none', marginLeft: 4 }}>Terms of Service</Link>,
                            <Link to="#" style={{ textDecoration: 'none', marginLeft: 4 }}>Payment Terms</Link>,
                            and <Link to="#" style={{ textDecoration: 'none', marginLeft: 4 }}>Privacy Policy</Link>.
                        </Typography>

                        <Button variant="contained" type="submit" fullWidth size="large">Sign Up</Button>
                    </Stack>
                </form>

                <Typography variant="body2" align="center" mt={3}>
                    Already have an account? <Link to="/login">Log in</Link>
                </Typography>
            </Paper>

            <Snackbar
                open={snack.open}
                autoHideDuration={3000}
                onClose={handleSnackClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={snack.severity} onClose={handleSnackClose} variant="filled" sx={{ width: '100%' }}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
