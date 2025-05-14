import React from 'react';
import { Box, Typography, TextField, Button, IconButton, Stack, Divider } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import CopyrightIcon from '@mui/icons-material/Copyright';

export const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: '#f5f5f5', p: 4 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                    justifyContent: 'space-between',
                    mb: 4,
                }}
            >
                {/* About Us Section */}
                <Box sx={{ flex: 1, mb: { xs: 3, md: 0 } }}>
                    <Typography variant="h6" gutterBottom>About us</Typography>
                    <Typography variant="body2" color="text.secondary">
                        At NexGen Homes, we are dedicated to helping you find the perfect property—whether it's your dream home, a vacation retreat, or an investment opportunity. 
                        Our platform offers a wide range of real estate options, from residential homes to commercial spaces, ensuring that you can find exactly what you need.
                    </Typography>
                </Box>

                {/* Links Section */}
                <Box sx={{ flex: 1, mb: { xs: 3, md: 0 } }}>
                    <Typography variant="h6" gutterBottom>NexGen Homes</Typography>
                    <Stack spacing={0.5}>
                        <Typography variant="body2" color="text.secondary">Newsroom</Typography>
                        <Typography variant="body2" color="text.secondary">New features</Typography>
                        <Typography variant="body2" color="text.secondary">Careers</Typography>
                        <Typography variant="body2" color="text.secondary">Investors</Typography>
                    </Stack>
                </Box>

                {/* Subscription Section */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>Stay updated</Typography>
                    <Stack direction="row" spacing={1}>
                        <TextField 
                            variant="outlined" 
                            size="small" 
                            placeholder="Enter Email" 
                            sx={{ flex: 1 }}
                        />
                        <Button sx={{
                                bgcolor: 'black',
                                '&:hover': { bgcolor: '#333' },
                                color: 'white',
                            }} variant="contained" size="small">Subscribe</Button>
                    </Stack>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Footer Bottom Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                <Box />

                <Typography variant="body2" color="text.secondary" align="center">
                    <CopyrightIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    2025 NexGen Homes | All rights reserved.
                </Typography>

                <Stack direction="row" spacing={1}>
                    <IconButton color="black" size="small">
                        <FacebookIcon />
                    </IconButton>
                    <IconButton color="black" size="small">
                        <TwitterIcon />
                    </IconButton>
                    <IconButton color="black" size="small">
                        <InstagramIcon />
                    </IconButton>
                </Stack>
            </Box>
        </Box>
    );
};
