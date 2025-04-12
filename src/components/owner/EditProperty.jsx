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
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Edit Property</Typography>

        <Grid container spacing={2}>
          {Object.entries(propertyData).map(([key, value]) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                value={value}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleUpdate}
        >
          Update Property
        </Button>
      </Paper>
    </Box>
  );
};
