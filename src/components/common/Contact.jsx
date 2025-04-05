import "../../assets/css/contact.css";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";



export const Contact = () => {
 
  return (

    <div className="contact-cont">
      <div className="contact-card">
        <div className="contact-back-link">
          <Link to=""><FaArrowLeft color="black" size={10}/><span>Back to Help Center</span></Link>
        </div>
        <div className="contact-content">
          <h1>Log in to contact us</h1>
          <p>This will help us quickly identify 
            you and get you the right kind of help</p>
        </div>
        <div className="contact-bt">
          <Link to="/login" className="contact-login">Login In</Link>
          <Link to="/signup"className="contact-sign">Sign Up</Link>
        </div>
        </div>
    </div>

  );
};


