import React from 'react';
import "../../assets/css/footer.css";
import { TiSocialFacebookCircular  } from "react-icons/ti";
import { FaInstagramSquare,FaRegCopyright   } from "react-icons/fa";
import { SlSocialTwitter  } from "react-icons/sl";



export const Footer = () => {
    return (
        <footer className="footer-cont">
            <div className='footer-first-section'>
                <div className='footer-content'>
                    <span className='footer-text'>About us</span>
                    <span className='footer-text'>At NexGen Homes, we are dedicated to helping you find 
                        the perfect property whether it's your dream home, a vacation retreat, or an 
                        investment opportunity. Our platform offers a wide range of real estate options, 
                        from residential homes to commercial spaces, ensuring that you can find exactly 
                        what you need.</span>
                </div>
                <div className='footer-content'>
                    <span className='footer-text'>quick links</span>
                    <a className='footer-text' href="#">Home</a>
                    <a className='footer-text' href="#">About us</a>
                    <a className='footer-text' href="#">Contact</a>
                    <a className='footer-text' href="#">Help</a>
                </div>
                <div className='footer-content'>
                    <span className='footer-text'>  NexGen Homes</span>
                    <span className='footer-text'>  Newsroom</span>
                    <span className='footer-text'>  New features</span>
                    <span className='footer-text'>  Careers</span>
                    <span className='footer-text'>  Investors</span>
                </div>
                <div className='footer-content'>
                    <span className="footer-text">Stay updated</span>
                    <div className='sub-cont'>
                        <input className='sub-ip' placeholder='Enter Email'/>
                        <button className='sub-bt'>subscribe</button>
                    </div>
                </div>
            </div>

            {/* <hr className='footer-line'/> */}
            <div className='footer-second-section'>
                <div className='footer-content'></div>
                <div className='footer-content'>
                    <span className="footer-text"><FaRegCopyright /> 2025 NexGen Homes | All rights reserved.</span>
                </div>
                <div className='footer-content'>
                    <span className="footer-text">social icons</span>
                    <span className='social-icons'>
                        <TiSocialFacebookCircular size={20}/>
                        <SlSocialTwitter />
                        <FaInstagramSquare />
                    </span>
                </div>
            </div>
        </footer>
    );
};
