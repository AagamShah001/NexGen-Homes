import React from 'react';
import { Box, Typography, Avatar, Rating } from '@mui/material';

export const Review = () => {
  return (
    <Box
      sx={{
        border: '1px solid #ddd',
        borderRadius: 2,
        p: 2,
        mb: 2,
        maxWidth: 500,
        boxShadow: 2,
        bgcolor: '#fff',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar
          src="/src/assets/img/help u.webp"
          alt="user img"
          sx={{ width: 48, height: 48, mr: 2 }}
        />
        <Typography variant="subtitle1" fontWeight={600}>
          Username
        </Typography>
      </Box>

      {/* Footer */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={4.5} precision={0.5} readOnly size="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            (4.5)
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Genevieve has an amazing home that was very welcoming. Really great little place to stay. The house gets a lot of natural light, which I think is rare in London.
        </Typography>
      </Box>
    </Box>
  );
};
