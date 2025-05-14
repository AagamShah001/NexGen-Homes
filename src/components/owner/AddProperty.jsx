import React, { useState, useEffect } from 'react';
import {
  Box, Button, MenuItem, TextField, Grid, InputLabel, Select,
  FormControl, OutlinedInput, Chip
} from '@mui/material';
import axios from 'axios';

export const AddProperty = () => {
  const userId = localStorage.getItem('id');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [img, setImg] = useState({
    name: '',
    propertyId: '',
    imgUrl: []
  });
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    subcategoryId: '',
    address: '',
    pincode: '',
    stateId: '',
    cityId: '',
    areaId: '',
    basePrice: '',
    yearBuilt: '',
    status: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    categoryId: '67e6081f9e86a16a62cc70f5',
    furnishingStatus: '',
    description: '',
    Amenities: [],
    userId: userId,

  });



  useEffect(() => {
    getAllStates();
    getAllSubCategory();
  }, []);

  const amenitiesList = [
    'Parking', 'Water Supply', 'Electricity Backup', 'Security',
    'Swimming Pool', 'Gym', 'Children’s Play Area', 'Club House',
    'Lift', 'CCTV Surveillance', 'Intercom Facility', 'Garden',
    'Jogging Track', 'Smart Home Features'
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const getAllStates = async () => {
    try {
      const res = await axios.get("/state/getallstates");
      setStates(res.data.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const getCityByStateId = async (stateId) => {
    try {
      const res = await axios.get(`/city/getcitybystate/${stateId}`);
      setCities(res.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const getAreaByCityId = async (cityId) => {
    try {
      const res = await axios.get(`/area/getareabycity/${cityId}`);
      setAreas(res.data.data);
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  };

  const getAllSubCategory = async () => {
    try {
      const res = await axios.get("/subcategory/getallSubCategory");
      setSubcategories(res.data.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'stateId') {
      setFormData((prev) => ({ ...prev, stateId: value }));
      getCityByStateId(value);
    } else if (name === 'cityId') {
      setFormData((prev) => ({ ...prev, cityId: value }));
      getAreaByCityId(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setImg((prev) => ({ ...prev, name: formData.name }));
  };


  const handleAmenitiesChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      Amenities: typeof value === 'string' ? value.split(',') : value
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImg((prev) => ({
      ...prev,
      imgUrl: files,
    }));
  };


  const submithandler = async () => {
    try {
      const res = await axios.post('/property/addproperty', formData);
      if (res.data.data._id) {
        // setImg((prev) => ({ ...prev, propertyId: res.data.data._id}));

        // console.log(img)
        // const imgres = await axios.post('/img/addimg', img);
        
        const uploadForm = new FormData();
        uploadForm.append("name", img.name);
        uploadForm.append("propertyId", res.data.data._id); 

        img.imgUrl.forEach((file) => {
          uploadForm.append("imgUrl", file); 
        });

        const imgres = await axios.post('/img/addimg', uploadForm, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        
         console.log('images added:', imgres.data);
      }
      else {
        console.log('img not uploded')
      }
      console.log('Property added:', res.data);
      // console.log('Property id:', res.data.data._id);
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };


  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto', height: 'auto' }}>
      <Grid container spacing={2}>
        <Grid sx={{ width: 490 }}>
          <TextField fullWidth label="Property Name" name="name" value={formData.name} onChange={handleChange} />
        </Grid>

        <Grid>
          <FormControl sx={{ width: 490 }}>
            <InputLabel>Property Type</InputLabel>
            <Select name="subcategoryId" value={formData.subcategoryId || ''} onChange={handleChange}>
              {subcategories.map((sub) => (
                <MenuItem key={sub._id} value={sub._id}>
                  {sub.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </Grid>

        <Grid>
          <TextField sx={{ width: 780 }} label="Address" name="address" value={formData.address} onChange={handleChange} />
        </Grid>

        <Grid>
          <TextField sx={{ width: 200 }} label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} type="number" />
        </Grid>

        <Grid>
          <FormControl sx={{ width: 330 }}>
            <InputLabel>State</InputLabel>
            <Select name="stateId" value={formData.stateId} onChange={handleChange}>
              {states.map((state) => (
                <MenuItem key={state._id} value={state._id}>{state.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid>
          <FormControl sx={{ width: 330 }}>
            <InputLabel>City</InputLabel>
            <Select name="cityId" value={formData.cityId} onChange={handleChange}>
              {cities.map((city) => (
                <MenuItem key={city._id} value={city._id}>{city.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid>
          <FormControl sx={{ width: 305 }}>
            <InputLabel>Area</InputLabel>
            <Select name="areaId" value={formData.areaId} onChange={handleChange}>
              {areas.map((area) => (
                <MenuItem key={area._id} value={area._id}>{area.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid>
          <TextField sx={{ width: 330 }} label="Price" name="basePrice" value={formData.basePrice} onChange={handleChange} type="number" />
        </Grid>

        <Grid>
          <TextField sx={{ width: 330 }} label="Year Built" name="yearBuilt" value={formData.yearBuilt} onChange={handleChange} type="date" InputLabelProps={{ shrink: true }} />
        </Grid>

        <Grid>
          <FormControl sx={{ width: 305 }}>
            <InputLabel>Status</InputLabel>
            <Select name="status" value={formData.status} onChange={handleChange}>
              <MenuItem value="For Sale">For Sale</MenuItem>
              <MenuItem value="Sold">Sold</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid>
          <TextField sx={{ width: 240 }} label="Bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange} type="number" />
        </Grid>

        <Grid>
          <TextField sx={{ width: 240 }} label="Bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleChange} type="number" />
        </Grid>

        <Grid>
          <TextField sx={{ width: 240 }} label="Size (Sq ft)" name="size" value={formData.size} onChange={handleChange} type="number" />
        </Grid>

        <Grid>
          <FormControl sx={{ width: 230 }}>
            <InputLabel>Furnishing Status</InputLabel>
            <Select name="furnishingStatus" value={formData.furnishingStatus} onChange={handleChange}>
              <MenuItem value="Furnished">Furnished</MenuItem>
              <MenuItem value="Semi-Furnished">Semi-Furnished</MenuItem>
              <MenuItem value="Unfurnished">Unfurnished</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid>
          <TextField sx={{ width: 1000 }} multiline rows={3} label="Description" name="description" value={formData.description} onChange={handleChange} />
        </Grid>

        <Grid>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="Amenities-label">Amenities</InputLabel>
            <Select
              labelId="Amenities-label"
              id="Amenities-select"
              multiple
              value={formData.Amenities}
              onChange={handleAmenitiesChange}
              input={<OutlinedInput id="select-multiple-chip" label="Amenities" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {amenitiesList.map((amenity) => (
                <MenuItem key={amenity} value={amenity}>
                  {amenity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid sx={{ width: '100%' }}>
          <Box sx={{ mt: 2 }}>
            <Button sx={{ height: 50, width: 200 }} variant="outlined" component="label">
              Upload Images
              <input hidden multiple type="file" onChange={handleFileChange} />
            </Button>
            <Box sx={{ mt: 2 }}>
              {img.imgUrl.map((file, index) => (
                <Box key={index} sx={{
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: 'Arial, sans-serif',
                  color: '#333',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  marginTop: '4px',
                }}>
                  • {file.name}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid sx={{ width: '100%' }}>
          <Button sx={{ width: 200, height: 55 }} variant="contained" color="primary" onClick={submithandler}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
