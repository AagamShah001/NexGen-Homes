import React, { useEffect, useState } from "react";
import "../../assets/css/homedetails.css";
import { PhotoTour } from "./PhotoTour.jsx"
import axios from "axios";
import { useParams } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import moment from 'moment';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Paper, Rating, Skeleton, Stack, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Snackbar, Alert } from '@mui/material';




export const HomeDetails = () => {

    const [Imgs, setImgs] = useState();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [Reviews, setReviews] = useState([]);
    const [Rate, setRate] = useState([]);
    const id = useParams().id;
    const userId = localStorage.getItem('id');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        message: ''
    });


    useEffect(() => {
        getAllImgsbyId();
    }, []);

    const getAllImgsbyId = async () => {
        try {
            const res = await axios.get("/img/img/" + id);
            const propertyData = res.data.data[0];
            setImgs(propertyData);

            if (propertyData.propertyId?._id) {
                getAllReviews(propertyData.propertyId._id);
                getAllRate(propertyData.propertyId._id);
            }
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };


    const getAllReviews = async (id) => {
        try {
            const res = await axios.get("/review/getallreviews/" + id);
            setReviews(res.data.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    const getAllRate = async (id) => {
        try {
            const res = await axios.get("/review/getratebypropertyid/" + id);
            setRate(res.data.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if user is logged in
        if (!userId) {
            setSnackbarMessage("You need to be logged in to send an inquiry.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            return; // Prevent form submission if not logged in
        }

        try {
            await notify();
            setSnackbarMessage("Your message has been sent!");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
            setFormData({ name: '', email: '', contact: '', message: '' }); // Reset form
        } catch (error) {
            setSnackbarMessage("Failed to send your message. Please try again.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };




    const notify = async () => {
        if (userId && Imgs.propertyId.userId._id) {
            try {
                const res = await axios.post('/createnotify', {
                    senderId: userId,
                    receiverId: Imgs.propertyId.userId._id,
                    message: `Inquiry from ${formData.name},
                              Phone No.: ${formData.contact}, 
                              message: ${formData.message}.`
                });
                console.log(res)
            } catch (error) {
                console.error(error);
            }
        }
    };
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <div className="Details-cont">
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>


            {Imgs ? (

                <div className="Details-head">
                    <div className="Details-title">{Imgs.name} </div>
                    <div className="Details-img-cont">
                        <div className="Details-img-leftsection"><img src={"http://localhost:3000/" + Imgs.imgUrl[0]} /></div>
                        <div className="Details-img-rightsection">
                            <div className="Details-img-rightsection-imgcard"><img src={"http://localhost:3000/" + Imgs.imgUrl[1]} /></div>
                            <div className="Details-img-rightsection-imgcard2"><img src={"http://localhost:3000/" + Imgs.imgUrl[2]} /></div>
                            <div className="Details-img-rightsection-imgcard"><img src={"http://localhost:3000/" + Imgs.imgUrl[3]} /></div>
                            <div className="Details-img-rightsection-imgcard4"><img src={"http://localhost:3000/" + Imgs.imgUrl[4]} />
                                <div onClick={() => setIsModalOpen(true)} className="Details-img-rightsection-link"><AppsRoundedIcon sx={{ fontSize: 20 }} />show all photos</div>
                                {<PhotoTour data={Imgs.imgUrl} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
                            </div>
                        </div>
                    </div>
                    <Box
                        sx={{
                            backgroundColor: '#f9f9f9',
                            borderRadius: 2,
                            p: 3,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            mb: 3,
                        }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{ color: '#333', mb: 1 }}
                        >
                            Location in {Imgs?.propertyId.cityId.name}, {Imgs?.propertyId.stateId.name}
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 500, color: '#444' }}
                        >
                            Base Price:{' '}
                            <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                {Imgs?.propertyId.basePrice?.toLocaleString('en-IN', {
                                    style: 'currency',
                                    currency: 'INR',
                                })}
                            </Box>
                        </Typography>
                    </Box>
                </div>

            ) : (
                <Box>
                    <Skeleton animation="wave" height={100} />
                    <Box>
                        <Skeleton variant="rounded" height={230} />
                    </Box>
                    <Skeleton animation="wave" height={80} />
                    <Skeleton animation="wave" height={60} />
                </Box>
            )
            }


            <div className="Details-body">
                {Imgs ? (

                    <Card
                        sx={{
                            p: { xs: 2, sm: 3, md: 4 },
                            width: '100%',
                            maxWidth: 1250,
                            mx: 'auto',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                            borderRadius: 3,
                            backgroundColor: '#fff',
                            display: 'flex',
                            gap: 3,
                            flexWrap: { xs: 'wrap', md: 'nowrap' },
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            transition: 'box-shadow 0.3s ease, transform 0.2s ease',
                            '&:hover': {
                                boxShadow: '0 6px 25px rgba(0, 0, 0, 0.08)',
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >

                        {/* Left: Property Owner Info */}
                        <CardContent sx={{ flex: 1, minWidth: 300 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar
                                    sx={{ width: 56, height: 56, mr: 2, bgcolor: '#333' }}
                                    src=""
                                    alt={Imgs?.propertyId.userId.firstname}
                                >
                                    {Imgs?.propertyId.userId.firstname?.charAt(0)}
                                </Avatar>
                                <Box>

                                    <Typography variant="h6" fontWeight="bold">
                                        {Imgs?.propertyId.userId.firstname}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Amenities */}
                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
                                {Imgs?.propertyId.Amenities.map((Amenitie) => (
                                    <Chip key={Amenitie} label={Amenitie} variant="outlined" />
                                ))}
                            </Stack>

                            {/* Description */}
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                    About this place
                                </Typography>
                                <Typography sx={{ width: 400 }} variant="body2" color="text.secondary">
                                    {Imgs?.propertyId.description === 'null'
                                        ? 'No Description Found'
                                        : Imgs?.propertyId.description}
                                </Typography>
                            </Box>
                        </CardContent>

                        {/* Right: Contact Form */}
                        <Paper
                            elevation={3}
                            sx={{
                                p: { xs: 3, md: 5 },
                                width: '100%',
                                maxWidth: 300,
                                mx: 'auto',
                                borderRadius: 3,
                                backgroundColor: '#fefefe',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            }}
                        >
                            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#333' }}>
                                Get in Touch with {Imgs?.propertyId.userId.firstname}
                            </Typography>

                            <Stack spacing={3} mt={2} component="form" onSubmit={handleSubmit}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                    size="medium"
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                    size="medium"
                                />
                                <TextField
                                    label="Contact Number"
                                    name="contact"
                                    type="tel"
                                    value={formData.contact}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                    size="medium"
                                />
                                <TextField
                                    label="Message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    size="medium"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        alignSelf: 'flex-start',
                                        px: 4,
                                        py: 1.5,
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                    }}
                                >
                                    Submit
                                </Button>
                            </Stack>

                        </Paper>
                    </Card>


                ) : (<Box>
                    <Skeleton animation="wave" width={800} height={100} />
                    <Box>
                        <Skeleton variant="rounded" width={800} height={230} />
                    </Box>
                    <Skeleton animation="wave" width={800} height={80} />
                    <Skeleton animation="wave" width={800} height={60} />
                </Box>)}




                <div className="Details-reviews-cont">
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1.5,
                                px: 3,
                                py: 2,
                                borderRadius: 2,
                                backgroundColor: '#f9f9f9',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                maxWidth: 400,
                                minWidth: '100%',
                                textAlign: 'center',
                            }}
                        >
                            {Reviews && Reviews.length > 0 ? (
                                <>
                                    <StarIcon sx={{ color: '#fbc02d' }} />
                                    <Typography variant="h6" fontWeight={600}>
                                        {(Rate?.averageRating / 10).toFixed(1)}
                                    </Typography>
                                    <CircleIcon sx={{ fontSize: 6, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {Rate?.totalReviews} Reviews
                                    </Typography>
                                </>
                            ) : (
                                <>
                                <span>No Rating and Reviews found</span>
                                </>
                            )}
                        </Box>
                    </Box>
                    <div className="Details-reviews-card-cont">
                        {Reviews && Reviews.length > 0 ? (
                            Reviews.map((review) => {
                                return (
                                    <Box
                                        key={review._id}
                                        component={Card}
                                        sx={{
                                            mb: 3,
                                            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                                            borderRadius: 3,
                                            p: 2,
                                            backgroundColor: '#fff',
                                        }}
                                    >
                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{ bgcolor: '#333' }}>
                                                    {review.userId.firstname.charAt(0)}
                                                </Avatar>
                                            }
                                            title={
                                                <Typography variant="subtitle1" fontWeight={600}>
                                                    {review.userId.firstname}
                                                </Typography>
                                            }
                                            subheader={
                                                <Typography variant="body2" color="text.secondary">
                                                    {moment(review.createdAt).format('MMMM Do YYYY')}
                                                </Typography>
                                            }
                                        />
                                        <CardContent sx={{ pt: 0 }}>
                                            <Box display="flex" alignItems="center" mb={1}>
                                                <Rating
                                                    name="read-only"
                                                    value={review.rate / 10}
                                                    precision={0.5}
                                                    readOnly
                                                    size="small"
                                                />
                                            </Box>
                                            <Typography variant="body1" color="text.primary">
                                                {review.description}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                )
                            })) : (
                            <>
                                
                            </>
                        )
                        }
                    </div>
                </div>


                <div className="Details-Disclaimer">


                    <Accordion
                        sx={{
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                            backgroundColor: '#fafafa',
                            borderRadius: 2,
                            px: 2,
                            my: 3,
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="disclaimer-content"
                            id="disclaimer-header"
                            sx={{
                                py: 2,
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{ color: '#333', mb: 1 }}
                                >
                                    Disclaimer
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    NexGen Homes provides a platform for users to explore, list, and manage properties.
                                    While we strive for accuracy, we recommend verifying all information independently.
                                </Typography>
                            </Box>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
                                NexGen Homes does not own or manage any of the properties listed on the platform and is not
                                responsible for any agreements or disputes that may arise between property owners, tenants,
                                or third-party service providers. All transactions and interactions are solely the
                                responsibility of the involved parties. By using this platform, you agree that NexGen Homes
                                is not liable for any direct, indirect, or consequential damages resulting from your use of
                                the website or reliance on the information provided. For concerns, contact our support team.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                </div>
            </div>
        </div>
    );
};


