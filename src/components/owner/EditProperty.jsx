import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, TextField, Button, Grid, Typography, Paper, CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const EditProperty = ({ id }) => {
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await axios.get(`/property/getpropertybyid/${id}`);
      const data = res.data.data;

      setPropertyData({
        name: data?.name || '',
        address: data?.address || '',
        pincode: data?.pincode || '',
        basePrice: data?.basePrice || '',
        size: data?.size || '',
        bedrooms: data?.bedrooms || '',
        bathrooms: data?.bathrooms || '',
        furnishingStatus: data?.furnishingStatus || '',
        Amenities: data?.Amenities || '',
        yearBuilt: data?.yearBuilt || '',
        description: data?.description || ''
      });
    } catch (err) {
      console.error("Failed to fetch property:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setPropertyData({
      ...propertyData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/property/updateproperty/${id}`, propertyData);
      alert("Property updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update property");
    }
  };

  if (loading || !propertyData) {
    return <Box textAlign="center" mt={5}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ p: 2, maxWidth: '800px', mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Edit Property
        </Typography>

        <Grid container spacing={2}>
          {Object.entries(propertyData).map(([key, value]) => (
            <Grid  key={key}>
              <TextField
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                value={value}
                onChange={handleChange}
                multiline={key === 'description'}
                minRows={key === 'description' ? 3 : 1}
                maxRows={key === 'description' ? 6 : 1}
                sx={key === 'description' ? { width: { xs: '100%', sm: '600px' } } : {}}
              />
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'flex-end' }
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Update Property
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
