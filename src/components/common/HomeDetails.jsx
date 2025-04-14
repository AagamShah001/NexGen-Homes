import React, { useEffect, useState } from "react";
import "../../assets/css/homedetails.css";
import { PhotoTour } from "./PhotoTour.jsx"
import axios from "axios";
import { useParams } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import moment from 'moment';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Card, CardContent, Chip, Divider, Paper, Rating, Skeleton, Stack, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



export const HomeDetails = () => {

    const [Imgs, setImgs] = useState();
    const [Reviews, setReviews] = useState([]);
    const [Rate, setRate] = useState([]);
    const id = useParams().id

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

    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <div className="Details-cont">

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
                    <div className="Details-description-overview">
                        <div className="Details-description-overview-title">Location in {Imgs?.propertyId.cityId.name}, {Imgs?.propertyId.stateId.name}</div>
                        <Divider />
                        <div className="Details-description-overview-price"><span>Base Price: {Imgs?.propertyId.basePrice?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
                        </div>
                    </div>
                    <Divider />
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
                            p: 2,
                            width: '100%',
                            maxWidth: 1250,
                            boxShadow: 'none',
                            backgroundColor: 'transparent',
                            display: 'flex',
                            gap: 4,
                            flexWrap: { xs: 'wrap', md: 'nowrap' },
                            justifyContent: 'space-between',
                            mx: 'auto',
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
                                    <Typography variant="body2" color="text.secondary">
                                        Owned By
                                    </Typography>
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
                                p: 4,
                                minWidth: 300,
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                Get in Touch with {Imgs?.propertyId.userId.firstname}
                            </Typography>

                            <Stack spacing={2}>
                                <TextField label="Name" fullWidth variant="outlined" />
                                <TextField label="Email" type="email" fullWidth variant="outlined" />
                                <TextField
                                    label="Contact Number"
                                    type="tel"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    label="Message"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2, alignSelf: 'flex-start' }}
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
                    <div className="Details-reviews-rate">
                        <div className="Details-reviews-rate-title">
                            {Reviews && Reviews.length > 0 ? (
                                <>
                                    <StarIcon />
                                    {(Rate?.averageRating) / 10}
                                    <CircleIcon sx={{ fontSize: 6, p: 1 }} />
                                    {Rate?.totalReviews} Reviews
                                </>
                            ) : (
                                <Skeleton animation="wave" width={1000} height={80} />
                            )}

                        </div>
                    </div>
                    <div className="Details-reviews-card-cont">
                        {Reviews && Reviews.length > 0 ? (
                            Reviews.map((review) => {
                                return (
                                    <div key={review._id} className="Details-reviews-card">
                                        <div className="Details-reviews-card-head">
                                            <div className="review-user-img">
                                                <Avatar

                                                    sx={{ width: 56, height: 56, mr: 2, bgcolor: '#333' }}
                                                    src=""
                                                    alt={review.userId.firstname}
                                                >
                                                    {review.userId.firstname.charAt(0)}
                                                </Avatar>
                                            </div>
                                            <div className="review-user-name">{review.userId.firstname}
                                                <div className="review-user-time">time</div>
                                            </div>
                                        </div>
                                        <div className="Details-reviews-card-body">
                                            <div className="review-bodysection">
                                                <div className="review-user-rate-date"><Rating name="read-only" value={(review.rate / 10)} readOnly />  {moment(review.createdAt).format('MMMM Do YYYY')}</div>
                                                <div className="review-user-description">
                                                    <p>{review.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })) : (
                            <>
                                <Box>
                                    <Skeleton variant="rounded" height={230} />
                                    <Skeleton animation="wave" height={80} />
                                    <Skeleton animation="wave" height={60} />
                                </Box>
                                <Box>
                                    <Skeleton variant="rounded" height={230} />
                                    <Skeleton animation="wave" height={80} />
                                    <Skeleton animation="wave" height={60} />
                                </Box>
                            </>
                        )
                        }
                    </div>
                </div>


                <div className="Details-Disclaimer">


                    <Accordion sx={{ p: 2, boxShadow: 'none', backgroundColor: 'transparent' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header">

                            <Typography component="span">

                                <div className="Details-Disclaimer-title">Disclaimer</div>

                                NexGen Homes provides a platform for users to explore, list,
                                and manage properties. While we strive to ensure that all property
                                listings and related information are accurate and up to date, we do
                                not guarantee the accuracy, completeness, or reliability of any data
                                provided on this site. Users are encouraged to verify all information
                                independently before making any decisions based on the content provided.
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                NexGen Homes does not own or manage any of the properties listed on the platform
                                and is not responsible for any agreements or disputes that may arise between property
                                owners, tenants, or third-party service providers. All transactions, arrangements,
                                and interactions are solely the responsibility of the parties involved.
                                By using this platform, you agree that NexGen Homes is not liable for any direct, indirect,
                                or consequential damages resulting from your use of the website or reliance on any information
                                provided herein. If you have any questions or concerns about this disclaimer, please contact our support team.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                </div>
            </div>
        </div>
    );
};


