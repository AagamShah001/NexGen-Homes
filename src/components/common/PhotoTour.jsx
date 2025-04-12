import React, { useEffect, useState } from 'react'
import { Box, IconButton, Grid, Modal } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

export const PhotoTour = ({ isOpen, onClose, data }) => {
  const [Imgs, setImgs] = useState([]);

  useEffect(() => {
    if (data) {
      setImgs(data);
    }
  }, [data]);

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={onClose} closeAfterTransition>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 900,
          backgroundColor: 'white',
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
          overflow: 'hidden',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
            borderRadius: '50%',
            zIndex: 10,
          }}
        >
          <ArrowBackIosIcon sx={{m: 0.5, ml: 1}} />
        </IconButton>

        {/* Image Gallery */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto' }}>
          
          <Grid container spacing={2}>
            {Imgs?.map((img, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 1,
                    overflow: 'hidden',
                    boxShadow: 2,
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <img
                    src={`http://localhost:3000/${img}`}
                    alt={`img-${index}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
}
