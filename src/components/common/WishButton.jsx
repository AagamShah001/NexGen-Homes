import { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';

export const WishButton = ({ propertyId, imgId }) => {
  const userId = localStorage.getItem('id');
  const role = localStorage.getItem('role');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [check, setCheck] = useState(true);
  useEffect(()=>{
    if(role==="User" || role==="Owner"){
      setCheck(false)
    }
  },[role])

  // Fetch current wishlist on mount
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userId || !propertyId) return;

      try {
        const res = await axios.get(`/wishlist/getwishlistbyuserid/${userId}`);
        const wishlistedIds = res.data.data.map((item) => item.propertyId._id);
        setIsWishlisted(wishlistedIds.includes(propertyId));
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
      }
    };

    fetchWishlist();
  }, [userId, propertyId]);


  const handleWishlistToggle = async () => {

    try {
      if (isWishlisted) {
        const delres = await axios.delete(`/wishlist/deletewishlist/${propertyId}`, {
          params: { userId }
        });        
        setIsWishlisted(false);
      } else {
        const addres = await axios.post('/wishlist/addwishlist',{ userId, propertyId, imgId });
        setIsWishlisted(true);

        const notifyres = await axios.post('/createnotify',{
          senderId: '67ebe82eb1a8d1c85a46d886',
          receiverId: userId,
          message: "Your property was added to a wishlist!",})
      }
    } catch (error) {
      console.error('Wishlist update failed:', error);
    }
  
  };

  return (
    <>

    {check?(
      <Tooltip placement="top" title="Login to use WishList feature" 
      slotProps={{
        tooltip: {
          sx: {
            fontSize: '1rem',     // Adjust the font size
            padding: '10px 15px', // Adjust the padding
            color: '#fff',
            borderRadius: '8px',
          },
        },
      }}
      >
        <span> 
          <IconButton disabled>
            <FavoriteBorderIcon color='error'  />
          </IconButton>
        </span>
      </Tooltip>
    ):(
    <IconButton onClick={handleWishlistToggle} color="error">
      {isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>

  )}
  </>

)
}