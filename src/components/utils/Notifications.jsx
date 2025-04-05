import React, { useState } from 'react'
import "../../assets/css/notifications.css"
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from 'react-router-dom';



export const Notifications = (role) => {

    const [notify, setnotify] = useState("close");

    const togglePopover = () => {
        setnotify(notify === "close" ? "open" : "close");
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
            setnotify("close");
        }
    };

    return (
        <div className='notify-cont' onBlur={handleBlur}>
            <button onClick={togglePopover} className="notify-bt">
                <IoMdNotificationsOutline size={25} />
            </button>
            <ol className={`notify-notify ${notify}`}>
                <li className="notify-list-item">
                    <div className='notify-item-content'>
                        <div className='notify-item-img'><img alt="A" src=""/></div>
                    </div>
                    <div className='notify-item-content'>
                        <Link className="notify-item-link" to="#">
                            <span>Since 1999, millions of people have expressed 
                            themselves on Blogger Since 1999, millions of 
                            peoples.</span>
                            <span>Date</span>
                        </Link>
                    </div>
                </li>
            </ol>
        </div>
    )
}
