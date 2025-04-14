import "../../assets/css/navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from "react-router-dom";
import { Menubar } from "./menubar";
import { useEffect, useState } from "react";
import { Notifications } from "../utils/Notifications";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  ClickAwayListener
} from "@mui/material";
import { Logo } from '../../components/icons/Logo';
import axios from "axios";

export const Navbar = () => {
  const [check, setCheck] = useState(false);
  const [result, setResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role === "User" || role === "Owner") {
      setCheck(true);
    }
  }, [role]);

  // Debounce search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        search(searchQuery);
      } else {
        setResult([]);
      }
    }, 300); // debounce delay

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const search = async (data) => {
    try {
      const res = await axios.get(`/property/search?query=${data}`);
      setResult(res.data); // res.data is already the array
      setOpenDropdown(true);
    } catch (error) {
      console.error(error);
      setResult([]); // On error, also set to empty array
      setOpenDropdown(true);
    }
  };

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

          <div className="nav-search-locality-cont" style={{ position: 'relative' }}>
            <input
              className="nav-search-locality-ip"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for locality, landmark, project, or builder"
            />

            <div className="nav-search-bt">
              <IconButton size="large" aria-label="search" color="inherit">
                <SearchIcon />
              </IconButton>
            </div>

            {/* Search results dropdown */}
            {openDropdown && (
              <ClickAwayListener onClickAway={() => setOpenDropdown(false)}>
                <Paper
                  elevation={3}
                  sx={{
                    position: 'absolute',
                    top: '110%',
                    width: 445,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    maxHeight: 250,
                    overflowY: 'auto',
                  }}
                >
                  <List>
                    {result.length > 0 ? (
                      result.map((property, index) => (
                        <ListItem
                          key={index}
                          component="a"
                          href={`/propertydetails/${property._id}`}
                          disablePadding
                          sx={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
                        >
                          <ListItemText
                            sx={{ p: 2 }}
                            primary={`${property.name}, ${property.stateId?.name}, ${property.cityId?.name}, ${property.areaId?.name}`}
                          />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem disablePadding>
                        <ListItemText
                          sx={{ p: 2, color: 'gray' }}
                          primary="No property or location found"
                        />
                      </ListItem>
                    )}
                  </List>
                </Paper>
              </ClickAwayListener>
            )}

          </div>
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-navigation">
          <div className="nav-navigation-link">
            {check ? (
              <Notifications />
            ) : (
              <Link id="nav-link" to="/signup">Host your property</Link>
            )}
          </div>
          <div className="nav-navigation-lng">
            <LanguageIcon sx={{ fontSize: 20 }} id="nav-link" />
          </div>
          <div className="nav-navigation-cont">
            <Menubar role={role} />
          </div>
        </div>
      </div>
    </div>
  );
};
