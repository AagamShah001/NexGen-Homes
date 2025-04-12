import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    Box,
    List,
    ListItem,
    Divider,
    Paper
} from '@mui/material';

export const ViewProperty = () => {
    const [Imgs, setImgs] = useState([]);
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

    return (
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
                {Imgs?.map((img) => (
                    <Grid  key={img._id}>
                        <Card sx={{ display: 'flex', boxShadow: 2 }}>

                            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <CardContent>
                                    <Typography variant="h6">
                                        {img.propertyId.name}, {img.propertyId.areaId?.name}, {img.propertyId.cityId?.name}, {img.propertyId.stateId?.name}
                                    </Typography>

                                    <Divider sx={{ my: 1 }} />

                                    <Grid container spacing={1}>
                                    <Grid  sx={{ display: 'flex', columnGap: 60 }}>
                                        
                                            <List dense>
                                                <ListItem disableGutters>Address: {img.propertyId.address}</ListItem>
                                                <ListItem disableGutters>Pincode: {img.propertyId.pincode}</ListItem>
                                                <ListItem disableGutters>Price: ₹{img.propertyId.basePrice}</ListItem>
                                                <ListItem disableGutters>Size: {img.propertyId.size} Sq Ft</ListItem>
                                                <ListItem disableGutters>Bedrooms: {img.propertyId.bedrooms}</ListItem>
                                                
                                                <ListItem disableGutters>Bathrooms: {img.propertyId.bathrooms}</ListItem>
                                                <ListItem disableGutters>Furnishing: {img.propertyId.furnishingStatus}</ListItem>
                                                <ListItem disableGutters>Amenities: {img.propertyId.Amenities}</ListItem>
                                                <ListItem disableGutters>Built in: {img.propertyId.yearBuilt}</ListItem>
                                                
                                            </List>
                                            <CardMedia
                                                    component="img"
                                                    sx={{ width: 500, height: 250, objectFit: 'cover', borderRadius: 2 }}
                                                    image={`http://localhost:3000/${img.imgUrl[0]}`}
                                                    alt="Property"
                                                />
                                        </Grid>
                                    </Grid>

                                    <Divider sx={{ my: 1 }} />

                                    <Typography variant="body2" color="text.secondary">
                                        {img.propertyId.description}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
