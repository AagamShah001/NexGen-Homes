// src/components/Review.jsx
import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Rating,
    Divider,
    Paper,
    Card,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
} from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

export const Reviews = () => {
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [Imgs, setImgs] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const id = localStorage.getItem('id');

    useEffect(() => {
        fetchUserImgs();
    }, []);

    const fetchUserImgs = async () => {
        try {
            const res = await axios.get(`/img/imgbyuserid/${id}`);
            setImgs(res.data.data || []);
        } catch (error) {
            console.error("Error fetching user images:", error);
        }
    };

    const fetchReviews = async (propertyId) => {
        try {
            const res = await axios.get(`/review/getallReviews/${propertyId}`);
            setReviews(res.data.data || []);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const handleEditClick = async (img, index) => {
        setSelectedProperty(img.propertyId);
        setEditIndex(index);
        await fetchReviews(img.propertyId._id);
    };

    const handleCloseOverlay = () => {
        setEditIndex(null);
        setSelectedProperty(null);
        setReviews([]);
    };

    return (
        <Box sx={{ p: 1 }}>
            <Grid container spacing={4} >
                {Imgs?.map((img, index) => (
                    <Grid  key={img._id} >
                        <Card sx={{ p: 2, width: 300, borderRadius: 8 }}>
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
                                    onClick={() => handleEditClick(img, index)}
                                >
                                    View Reviews
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
                                    overflowY: 'auto',
                                    px: 2,
                                }}
                            >
                                <IconButton
                                    onClick={handleCloseOverlay}
                                    sx={{
                                        position: 'absolute',
                                        top: 50,
                                        right: 100,
                                        color: '#fff',
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>

                                <Box sx={{ maxWidth: 800, width: '100%', bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
                                    <Typography variant="h4" gutterBottom>
                                        Property Reviews
                                    </Typography>

                                    {selectedProperty && (
                                        <>
                                            <Typography variant="h6" gutterBottom>
                                                {selectedProperty.name} - {selectedProperty.areaId?.name}, {selectedProperty.cityId?.name}, {selectedProperty.stateId?.name}
                                            </Typography>

                                            <Divider sx={{ my: 3 }} />

                                            {reviews.length === 0 ? (
                                                <Typography>No reviews available for this property.</Typography>
                                            ) : (
                                                reviews.map((review, idx) => (
                                                    <Paper key={idx} sx={{ p: 2, mb: 2 }}>
                                                        <Box display="flex" alignItems="center" justifyContent="space-between">
                                                            <Typography variant="subtitle1">{review.userId.firstname}</Typography>
                                                            <Rating value={review.rate / 10} readOnly size="small" />
                                                        </Box>
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                            {new Date(review.createdAt).toLocaleDateString()}
                                                        </Typography>
                                                        <Typography>{review.description}</Typography>
                                                    </Paper>
                                                ))
                                            )}
                                        </>
                                    )}
                                </Box>
                            </Box>
                        )}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
