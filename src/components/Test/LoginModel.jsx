import React from "react";
import "./loginmode.css";

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Hide modal if not open

  return (
    <div className="overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <img src="your-logo.png" alt="Logo" className="logo" />
        <h2>Your Trusted Real Estate Partner</h2>
        <label>Enter Phone Number</label>
        <div className="input-box">
          <span>+91</span>
          <input type="text" placeholder="Enter your number" />
        </div>
        <button className="continue-btn" disabled>Continue</button>
      </div>
    </div>
  );
};

export default LoginModal;
