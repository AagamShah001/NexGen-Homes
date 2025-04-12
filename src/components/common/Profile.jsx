import React, { useRef, useState } from 'react';
import {
  Box,
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export const Profile = () => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, p: 4, gap: 4 }}>
      
      {/* Left: Profile Picture Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 250 }}>
        <Box sx={{ position: 'relative', width: 150, height: 150 }}>
          <Avatar
            alt="Profile"
            src={selectedImage || '#'}
            sx={{ width: 150, height: 150, fontSize: 48 }}
          >
            M
          </Avatar>

          {/* Camera Icon triggers file input */}
          <IconButton
            color="primary"
            onClick={handleImageClick}
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: 'white',
              boxShadow: 2,
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            <CameraAltIcon />
          </IconButton>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </Box>
      </Box>

      {/* Right: Form Section */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Your Profile
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="First Name" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Last Name" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email" type="email" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Phone Number" type="tel" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Pincode" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Gender" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Date of Birth"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="State" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="City" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Address" variant="outlined" />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary">Done</Button>
        </Box>
      </Box>
    </Box>
  );
};
