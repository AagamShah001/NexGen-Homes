import React, { useEffect, useState } from 'react'
import "../../assets/css/menubar.css";
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const Menubar = ({role}) => {

    const [User, setUser] = useState(false);
    const [Owner, setOwner] = useState(false);
    const [Bydefault, setBydefault] = useState(true);
    const [Menu, setMenu] = useState("close");

    

    const togglePopover = () => {
        setMenu(Menu === "close" ? "open" : "close");
        if (role === 'User') {
            setUser(true);
            setOwner(false);
            setBydefault(false);
        } else if (role === 'Owner') {
            setOwner(true);
            setUser(false);
            setBydefault(false);
        }
    }

    const handleBlur = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setMenu("close");
        }
    };

    return (
        <div className='menubar-cont' onBlur={handleBlur}>
            <button onClick={togglePopover} className="menubar-bt">
                <FaUserCircle size={35} />
            </button>
            

            {Bydefault &&(
                <ol className={`menubar-menu ${Menu}`}>
                    <li className="menu-list-item"><Link className="menu-item-link" to="/signup">Sign up</Link></li>
                    <li className="menu-list-item"><Link className="menu-item-link" to="/login">Login</Link></li>
                    <li className="menu-list-item"><Link className="menu-item-link" to="/home">Home</Link></li>
                    <li className="menu-list-item"><Link className="menu-item-link" to="/contact">Contact us</Link></li>
                </ol>
                        )}
                
                {Owner &&(
                <ol className={`menubar-menu ${Menu}`}>
                        <li className="menu-list-item"><Link className="menu-item-link" to="/login">Dashboard</Link></li>
                        <li className="menu-list-item"><Link className="menu-item-link" to="/signup">Messages</Link></li>
                        <li className="menu-list-item"><Link className="menu-item-link" to="/home">Profile</Link></li>
                        <li className="menu-list-item"><Link className="menu-item-link" to="/contact">Logout</Link></li>
                    </ol>
                )}
                {User &&(
                    <ol className={`menubar-menu ${Menu}`}>
                        <li className="menu-list-item"><Link className="menu-item-link" to="/login">Wishlist</Link></li>
                        <li className="menu-list-item"><Link className="menu-item-link" to="/signup">Messages</Link></li>
                        <li className="menu-list-item"><Link className="menu-item-link" to="/home">Profile</Link></li>
                        <li className="menu-list-item"><Link className="menu-item-link" to="/contact">Logout</Link></li>
                    </ol>
                )}
            
        </div>
    )
}
