import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { EditProperty } from './EditProperty';

export const ClickProperty = () => {
  const [Imgs, setImgs] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const id = localStorage.getItem("id");

  useEffect(() => {
    getAllImgs();
  }, []);

  const getAllImgs = async () => {
    try {
      const res = await axios.get(`/img/imgbyuserid/${id}`);
      setImgs(res.data.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleCloseOverlay = () => {
    setEditIndex(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={4}>
        {Imgs?.map((img, index) => (
          <Grid  key={img._id}>
            <Card sx={{ p: 2, width: 300,borderRadius: 5 }}>
              <CardMedia
                component="img"
                image={`http://localhost:3000/${img.imgUrl[0]}`}
                alt="Property"
                sx={{
                  width: '100%',
                  height: 180,
                  objectFit: 'cover',
                  borderRadius: 5,
                }}
              />
              <CardContent>
                <Typography gutterBottom>
                  {img.propertyId.name}, {img.propertyId.areaId?.name}, {img.propertyId.cityId?.name}, {img.propertyId.stateId?.name}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{borderRadius: 3}}
                  startIcon={<EditIcon />}
                  onClick={() => setEditIndex(index)}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>

            {editIndex === index && (
              <Box
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  zIndex: 1300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconButton
                  onClick={handleCloseOverlay}
                  sx={{
                    position: 'absolute',
                    top: 150,
                    right: 50,
                    color: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <EditProperty id={img.propertyId._id} />
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
