import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress
} from '@mui/material';
import { Link } from 'react-router-dom';

export const Wishlist = () => {
  const userId = localStorage.getItem('id');
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`/wishlist/getwishlistbyuserid/${userId}`);
        setWishlist(res.data.data);
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchWishlist();
  }, [userId]);

  console.log(wishlist)

  return (
    <Container sx={{ mt: 20, mb: 20 }}>
      <Typography variant="h4" gutterBottom>
        Your Wishlist
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : wishlist.length === 0 ? (
        <Typography variant="body1">No properties in your wishlist.</Typography>
      ) : (
        <Grid container spacing={3}>
          {wishlist.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card
              component={Link}
              sx={{ textDecoration: 'none', color: 'inherit' }}
              to={`/homedetails/${item.imgId?._id}`}>
                <CardMedia
                  component="img"
                  height="180"
                  sx={{ borderRadius: 5 }}
                  image={"http://localhost:3000/"+item.imgId.imgUrl?.[0] || '/placeholder.jpg'}
                  alt={item.propertyId?.name || 'Property Image'}
                />
                <CardContent>
                  <Typography variant="h6">
                    {item.propertyId?.name || 'Untitled Property'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
