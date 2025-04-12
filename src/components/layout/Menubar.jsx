import React, { useState } from 'react'
import "../../assets/css/menubar.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

export const Menubar = ({role}) => {

    const [User, setUser] = useState(false);
    const [Owner, setOwner] = useState(false);
    const [Bydefault, setBydefault] = useState(true);
    const [Menu, setMenu] = useState("close");

    const handleLogout = () => {
      localStorage.clear(); 
    };

    

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
                <AccountCircleIcon sx={{ fontSize: 40 }} />
            </button>
            

            {Bydefault &&(
                <ol className={`menubar-menu ${Menu}`}>
                    <li className="menu-list-item"><Link className="menu-item-link" to="/signup">Sign up</Link></li>
                    <li className="menu-list-item"><Link className="menu-item-link" to="/login">Login</Link></li>
                    <li className="menu-list-item"><Link className="menu-item-link" to="/home">Home</Link></li>
                    <li className="menu-list-item"><Link className="menu-item-link" to="/helpcenter">Help Center</Link></li>
                </ol>
                        )}
                
                {Owner &&(
                <ol className={`menubar-menu ${Menu}`}>
                        <li className="menu-list-item"><Link className="menu-item-link" to="/dashboard">Dashboard</Link></li>
                        <li className="menu-list-item"><Link className="menu-item-link" to="/profile">Profile</Link></li>
                        <li className="menu-list-item"><Link className="menu-item-link" to="/wishlist">Wishlist</Link></li>
                        <li className="menu-list-item"><a onClick={handleLogout} className="menu-item-link" href="/">Logout</a></li>
                    </ol>
                )}
                {User &&(
                    <ol className={`menubar-menu ${Menu}`}>
                        <li className="menu-list-item"><Link className="menu-item-link" to="/Home">Home</Link></li>
                        <li className="menu-list-item"><Link className="menu-item-link" to="/wishlist">Wishlist</Link></li>
                        <li className="menu-list-item"><Link className="menu-item-link" to="/profile">Profile</Link></li>
                        <li className="menu-list-item"><a onClick={handleLogout} className="menu-item-link" href="/">Logout</a></li>
                    </ol>
                )}
            
        </div>
    )
}
