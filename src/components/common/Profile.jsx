import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Grid, Avatar, Typography, TextField, Button, IconButton,
  MenuItem, Select, InputLabel, FormControl, Snackbar, Alert,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [profileData, setProfileData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    pincode: '',
    Gender: '',
    dob: '',
    stateId: '',
    cityId: '',
    areaId: '',
    address: '',
  });



  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/user/userprofile/${userId}`);
        const data = res.data.data;

        setProfileData({
          firstname: data.firstname || '',
          lastname: data.lastname || '',
          email: data.email || '',
          phonenumber: data.phonenumber || '',
          pincode: data.pincode || '',
          Gender: data.Gender || '',
          dob: data.dob ? data.dob.slice(0, 10) : '',
          stateId: data.stateId?._id || '',
          cityId: data.cityId?._id || '', // Initializing cityId here
          areaId: data.areaId?._id || '',
          address: data.address || '',
        });

        if (data.stateId?._id) await fetchCities(data.stateId?._id);
        if (data.cityId?._id) await fetchAreas(data.cityId?._id);
      } catch (err) {
        console.error('Error loading profile:', err);
      }
    };

    fetchStates();
    fetchProfile();
  }, [userId]);

  const fetchStates = async () => {
    try {
      const res = await axios.get('/state/getallstates');
      setStates(res.data.data);
    } catch (err) {
      console.error('Error fetching states:', err);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const res = await axios.get(`/city/getcitybystate/${stateId}`);
      setCities(res.data.data);
    } catch (err) {
      console.error('Error fetching cities:', err);
    }
  };

  const fetchAreas = async (cityId) => {
    try {
      const res = await axios.get(`/area/getareabycity/${cityId}`);
      setAreas(res.data.data);
    } catch (err) {
      console.error('Error fetching areas:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'stateId') {
      setProfileData(prev => ({ ...prev, stateId: value, cityId: '', areaId: '' }));
      fetchCities(value);
    } else if (name === 'cityId') {
      setProfileData(prev => ({ ...prev, cityId: value, areaId: '' }));
      fetchAreas(value);
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }));
    }
  };

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

  const handleUpdate = async () => {
    try {
      await axios.put(`/user/updateprofile/${userId}`, profileData);
      setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Failed to update profile.', severity: 'error' });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, p: 4 }}>
      {/* Image Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 250 }}>
        <Box sx={{ position: 'relative', width: 150, height: 150 }}>
          <Avatar
            src={selectedImage || '#'}
            alt="Profile"
            sx={{ width: 150, height: 150, fontSize: 48 }}
          >
            M
          </Avatar>
          <IconButton
            onClick={handleImageClick}
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: 'white',
              boxShadow: 2,
              '&:hover': { backgroundColor: '#f0f0f0' },
            }}
          >
            <CameraAltIcon />
          </IconButton>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </Box>
      </Box>

      {/* Form Section */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Edit Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid >
            <TextField fullWidth label="First Name" name="firstname" value={profileData.firstname} />
          </Grid>
          <Grid >
            <TextField fullWidth label="Last Name" name="lastname" value={profileData.lastname} />
          </Grid>
          <Grid >
            <TextField fullWidth disabled label="Email" name="email" value={profileData.email} />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Phone"
              name="phonenumber"
              value={profileData.phonenumber}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, '');
                if (onlyNums.length <= 10) {
                  setProfileData(prev => ({ ...prev, phonenumber: onlyNums }));
                }
              }}
            />
          </Grid>
          <Grid >
            <TextField
              fullWidth
              label="Pincode"
              name="pincode"
              value={profileData.pincode}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, '');
                if (onlyNums.length <= 6) {
                  setProfileData(prev => ({ ...prev, pincode: onlyNums }));
                }
              }}
            />
          </Grid>
          <Grid >
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select name="Gender" value={profileData.Gender} onChange={handleChange} label="Gender">
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <TextField
              fullWidth
              type="date"
              label="Date of Birth"
              name="dob"
              value={profileData.dob}
              onChange={handleChange}
            />
          </Grid>
          <Grid >
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select name="stateId" value={profileData.stateId} onChange={handleChange}>
                {states.map(state => (
                  <MenuItem key={state._id} value={state._id}>{state.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid >
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select name="cityId" value={
                cities.find((c) => c._id === profileData.cityId)
                  ? profileData.cityId
                  : ''
              } onChange={handleChange}>
                {cities.length > 0 ? (
                  cities.map(city => (
                    <MenuItem key={city._id} value={city._id}>{city.name}</MenuItem>
                  ))
                ) : (
                  <MenuItem value="">No cities available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid >
            <FormControl fullWidth>
              <InputLabel>Area</InputLabel>
              <Select name="areaId" value={
                areas.find((a) => a._id === profileData.areaId)
                  ? profileData.areaId
                  : ''
              } onChange={handleChange}>
                {areas.length > 0 ? (
                  areas.map(area => (
                    <MenuItem key={area._id} value={area._id}>{area.name}</MenuItem>
                  ))
                ) : (
                  <MenuItem value="">No areas available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid >
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update Profile
          </Button>
        </Box>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={snackbar.severity} onClose={handleSnackbarClose}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};
