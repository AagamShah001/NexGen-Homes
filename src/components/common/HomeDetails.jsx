import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/css/homedetails.css";
import { IoIosArrowForward } from "react-icons/io";
import { PiDotsNine } from "react-icons/pi";
import { PhotoTour } from "./PhotoTour.jsx"
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import moment from 'moment';



export const HomeDetails = () => {

    const [Imgs, setImgs] = useState([]);
    const [Reviews, setReviews] = useState([]);
    const [Rate, setRate] = useState([]);
    const id = useParams().id

    useEffect(() => {
        getAllImgsbyId();
        getAllReviews();
        getAllRate();
    }, []);

    const getAllImgsbyId = async () => {
        try {
            const res = await axios.get("/img/img/" + id);
            setImgs(res.data.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    const getAllReviews = async () => {
        try {
            const res = await axios.get("/review/getallreviews/" + id);
            setReviews(res.data.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    const getAllRate = async () => {
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

            {Imgs?.map((img) => {
                return (
                    <div key={img._id} className="Details-head">
                        <div className="Details-title">{img?.name} </div>
                        <div className="Details-img-cont">
                            <div className="Details-img-leftsection"><img src={img.imgUrl?.[0] ? "http://localhost:3000/" + img.imgUrl[0] : ""} /></div>
                            <div className="Details-img-rightsection">
                                <div className="Details-img-rightsection-imgcard"><img src={img?.imgUrl?.[1] ? "http://localhost:3000/" + img.imgUrl[1] : ""} /></div>
                                <div className="Details-img-rightsection-imgcard2"><img src={img?.imgUrl?.[2] ? "http://localhost:3000/" + img.imgUrl[2] : ""} /></div>
                                <div className="Details-img-rightsection-imgcard"><img src={img?.imgUrl?.[3] ? "http://localhost:3000/" + img.imgUrl[3] : ""} /></div>
                                <div className="Details-img-rightsection-imgcard4"><img src={img?.imgUrl?.[4] ? "http://localhost:3000/" + img.imgUrl[4] : ""} />
                                    <div onClick={() => setIsModalOpen(true)} className="Details-img-rightsection-link"><PiDotsNine />show all photos</div>
                                    {img?.imgUrl?.length > 0 && (<PhotoTour data={img.imgUrl} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />)}
                                </div>
                            </div>
                        </div>
                        <div className="Details-description-overview">
                            <div className="Details-description-overview-title">Location in {img?.propertyId?.cityId?.name}, {img?.propertyId?.stateId?.name}</div>
                        </div>
                    </div>

                )
            })}


            <div className="Details-body">
                {Imgs?.map((img) => {
                    return (
                        <div className="Details-owner-card">
                            <div className="Details-owner-name">
                                <div className="Details-owner-img"><img src="" alt={img.propertyId.userId.firstname.charAt(0)} /></div>
                                <p>Owned By</p>{img.propertyId.userId.firstname}
                            </div>
                            <div className="Details-owner-key-points">
                                {img.propertyId.Amenities.map((Amenitie) => {
                                    return (<span key={Amenitie} className="key-points">{Amenitie}</span>)
                                })}
                            </div>
                            <div className="Details-owner-description">
                                <p className="description-paragraph-title">About this place</p>
                                <p className="description-paragraph">{img.propertyId.description === "null" ? "No Description Found" : img.propertyId.description}</p>
                            </div>
                        </div>

                    )
                })}




                <div className="Details-reviews-cont">
                    <div className="Details-reviews-rate">
                        <div className="Details-reviews-rate-title">
                            <FaStar id="star-icon" size={25} /> {Rate?.averageRating}<LuDot />{Rate?.totalReviews} Reviews
                        </div>
                    </div>
                    <div className="Details-reviews-card-cont">
                        {Reviews?.map((review) => {
                            return (
                                <div key={review._id} className="Details-reviews-card">
                                    <div className="Details-reviews-card-head">
                                        <div className="review-user-img"><img src="" alt={review.userId.firstname.charAt(0)} /></div>
                                        <div className="review-user-name">{review.userId.firstname}
                                            <div className="review-user-time">time</div>
                                        </div>
                                    </div>
                                    <div className="Details-reviews-card-body">
                                        <div className="review-bodysection">
                                            <div className="review-user-rate-date"><FaStar id="star-icon" size={15} />{(review.rate/10)}<LuDot /> {moment(review.date).format('MMMM Do YYYY')}</div>
                                            <div className="review-user-description">
                                                <p>{review.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>


                <div className="Details-Disclaimer">
                    <div className="Details-Disclaimer-title">Disclaimer</div>
                    <div className="Details-Disclaimer-overview">
                        Housing.com is only acting as a medium for
                        providing online advertising services.
                        Housing.com does not in any way facilitate
                        and cannot be deemed to be facilitating sales
                        between developers and the visitors/users of
                        the website. The display of information on
                        Housing.com with respect to a developer or
                        project does not guarantee that the
                        developer / project has registered under the
                        Real Estate (Regulation and Development), 2016
                        or is compliant with the same. Before deciding
                        to purchase or taking any other action, you are
                        requested to exercise due caution and to
                        independently validate and verify all information
                        about the project.
                    </div>
                    <div className="Details-Disclaimer-Link">
                        <a className="Details-description-link" href="#">
                            Show more<IoIosArrowForward id="arrow-icon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};


