import "../../assets/css/navbar.css";
import { IoSearch } from "react-icons/io5";
import { GoGlobe } from "react-icons/go";
import { Link } from "react-router-dom";
import { Menubar } from "./menubar";
import { useEffect, useState } from "react";
import { Notifications } from "../utils/Notifications";


export const Navbar = () => {

  const [check, setcheck] = useState('');
  const id = localStorage.getItem('id');
  const role = localStorage.getItem('role');

  useEffect(()=>{

    setcheck(role)
  },[role]);

  return (
    <div className="nav-cont">
      <div className="nav-section">
        <div className="nav-logo">
            <Link className="nav-item-link" to="/home">NexGen Homes</Link>
        </div>
      </div>
      <div className="nav-section">
        <div className="nav-search">
          <input className="nav-search-location" placeholder="enter location"/>
          <div className="nav-search-locality-cont">
            <input className="nav-search-locality-ip" placeholder="Search for locality, landmark, project, or builder"/>
            <button className="nav-search-bt"><IoSearch /></button>
          </div>
        </div>
      </div>
      <div className="nav-section">
        <div className="nav-navigation">
          <div className="nav-navigation-link">
            {check?<Notifications role={check}/>:"Host your property"}
          </div>
          <div className="nav-navigation-lng"><GoGlobe /></div>
          <div className="nav-navigation-cont">
              <Menubar role={check}></Menubar>
          </div>
        </div>
      </div>
    </div>
  );
};
