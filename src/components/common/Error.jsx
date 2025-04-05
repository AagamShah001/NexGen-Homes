import React from 'react'
import "../../assets/css/error.css"; 
import { Link } from 'react-router-dom';
import { Navbar } from '../layout/Navbar';

export const Error = () => {
  return (

    <div className='error-cont'>
        <div className="error-text">
            <h1>404</h1>
            <p>Oops! Page not found</p>
            <p>The page you're looking for doesn't exist or has been moved.</p>
            <Link className='home-link' to="/">Go Home</Link>
        </div>
    </div>

  )
}
