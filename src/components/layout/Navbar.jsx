import "../../assets/css/navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from "react-router-dom";
import { Menubar } from "./menubar";
import { useEffect, useState } from "react";
import { Notifications } from "../utils/Notifications";
import { IconButton } from "@mui/material";
import {Logo} from '../../components/icons/Logo';


export const Navbar = () => {

  const [check, setCheck] = useState(false);
  const role = localStorage.getItem('role');

  useEffect(()=>{
    if(role==="User" || role==="Owner"){
      setCheck(true)
    }
  },[role])
  

  return (
    <div className="nav-cont">
      <div className="nav-section">
        <div className="nav-logo">
          <Link className="nav-item-link" to="/home">
              <Logo color="#911EE3" size={40} />
            <span className="nav-link-text">NexGen Homes</span>
          </Link>
        </div>
      </div>
      <div className="nav-section">
        <div className="nav-search">
          <input className="nav-search-location" placeholder="Enter location" />
          <div className="nav-search-locality-cont">
            <input className="nav-search-locality-ip" placeholder="Search for locality, landmark, project, or builder" />
            <div className="nav-search-bt">
              <IconButton size="large" aria-label="search" color="inherit">
                <SearchIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-section">
        <div className="nav-navigation">
          <div className="nav-navigation-link">
            {check ? <Notifications /> : <Link id="nav-link" to="/signup">Host your property</Link>}
          </div>
          <div className="nav-navigation-lng"><LanguageIcon sx={{ fontSize: 20 }} id="nav-link" /></div>
          <div className="nav-navigation-cont">
            <Menubar role={role}></Menubar>
          </div>
        </div>
      </div>
    </div>
  );
};
