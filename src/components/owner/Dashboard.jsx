import React, { useEffect, useState } from 'react'
import "../../assets/css/dashboard.css";
import { IoPeople } from "react-icons/io5";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaHeadset } from "react-icons/fa6";



export const Dashboard = () => {

    const [Imgs, setImgs] = useState([]);
    const id = localStorage.getItem("id")
    useEffect(() => {
        getAllImgs();
    }, []);

    const getAllImgs = async () => {
        try {
            const res = await axios.get("/img/imgbyuserid/" + id);
            setImgs(res.data.data);

        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    return (
        <div className='dashboard-cont'>
            <div className='dashboard-head'>
                <div className='dashboard-head-username'></div>
                <div className='dashboard-head-addproperty-link'><Link id="property-link" to="/addproperty">Add Property</Link></div>
            </div>

            <div className='dashboard-body'>
                <div className='dashboard-body-card'>
                    <div className='dbody-card-title'>Your Property</div>
                    <div className='dbody-card-nav-cont'>
                        <div className='dbody-card-nav'>
                            <button className='dbody-card-nav-bt'>View Property</button>
                            <button className='dbody-card-nav-bt'>View reviews</button>
                            <button className='dbody-card-nav-bt'>Edit Property</button>
                        </div>
                    </div>
                    <div className='dbody-card-view'>
                        <div className='dbody-card-overview'>
                            {Imgs?.map((img) => {
                                return (
                                    <div key={img._id} className='overview-cont'>
                                        <div className='overview-cont-section'>
                                            <div className='overview-left'>
                                                <img alt="property" src={"http://localhost:3000/" + img.imgUrl[0]} />
                                            </div>
                                            <div className='overview-right'>
                                                <div className='dproperty-name'>
                                                    {img.propertyId.name},
                                                    {img.propertyId.areaId.name},               
                                                    {img.propertyId.cityId.name},
                                                    {img.propertyId.stateId.name}
                                                </div>
                                                <ol className='dproperty-details'>

                                                    <li className='dproperty-item'>Address: {img.propertyId.address}</li>
                                                    <li className='dproperty-item'>Pincode: {img.propertyId.pincode}</li>
                                                    <li className='dproperty-item'>Price: {img.propertyId.basePrice}</li>
                                                    <li className='dproperty-item'>Size(Sq Ft): {img.propertyId.size}</li>
                                                    <li className='dproperty-item'>Bedrooms: {img.propertyId.bedrooms}</li>
                                                    <li className='dproperty-item'>Bathrooms: {img.propertyId.bathrooms}</li>
                                                    <li className='dproperty-item'>FurnishingStatus: {img.propertyId.furnishingStatus}</li>
                                                    <li className='dproperty-item'>Amenities: {img.propertyId.Amenities}</li>
                                                    <li className='dproperty-item'>Built in: {img.propertyId.yearBuilt}</li>

                                                </ol>
                                            </div>
                                        </div>
                                        <div className='overview-cont-section'>
                                            <div className='dproperty-description'>{img.propertyId.description}</div>
                                        </div>
                                    </div>)

                            })}

                        </div>

                    </div>
                </div>
            </div>

            <div className='dashboard-footer'>
                <div className='dashboard-footer-help'>
                    <div className='footer-help-title'>We’re here to help</div>
                    <div className='footer-help-card'>
                        <div className='fhelp-card'>
                            <div className='fhelp-card-icon'><IoPeople size={30} /></div>
                            <div className='fhelp-card-paragraph'><span>Join your local Host Club</span>
                                <p>Connect, collaborate and share
                                    with other hosts and community
                                    members.</p>
                            </div>
                        </div>
                        <div className='fhelp-card'>
                            <div className='fhelp-card-icon'><FaHeadset size={30}/></div>
                            <div className='fhelp-card-paragraph'><span>Contact specialised support</span>
                                <p>As a new Owner, you get one-tap access to a specially trained support team.                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='dashboard-footer-blog'>
                    <div className='footer-blog-title'>title</div>
                    <div className='footer-blog-card'>
                        <div className='fblog-card'>
                            <div className='fblog-card-img'><img src="../src\assets\img\blog-house.webp"/></div>
                            <div className='fblog-card-title'>Write a house manual to share info about your space</div>
                        </div>
                        <div className='fblog-card'>
                            <div className='fblog-card-img'><img src="../src\assets\img\help u.webp"/></div>
                            <div className='fblog-card-title'>Help your listing stand out</div>
                        </div>
                        <div className='fblog-card'>
                            <div className='fblog-card-img'><img src="../src\assets\img\review price.webp"/></div>
                            <div className='fblog-card-title'>Review your price</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
