import React from 'react';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
  useTheme,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/SpaceDashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountCircle';
import SupportIcon from '@mui/icons-material/SupportAgent';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { AdminNavbar } from './AdminNavbar';

export const AdminSidebar = ({ collapsed, toggleSidebar }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const menuItems = [
    { icon: <DashboardIcon />, label: 'Dashboard', path: '/adminpanel' },
    { icon: <AccountBoxIcon />, label: 'Profile', path: '/profile' },
    { icon: <SupportIcon />, label: 'Support', path: '/support' },
    { icon: <SettingsIcon />, label: 'Settings', path: '/settings' },
    { icon: <HomeIcon />, label: 'Home', path: '/' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      sx={{
        width: collapsed ? 60 : 220,
        transition: 'width 0.3s',
        height: '100vh',
        bgcolor: 'background.paper',
        borderRight: '1px solid #e0e0e0',
        boxShadow: 3,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 1,
      }}
    >
      {/* Top Section */}
      <Box>
        <Box display="flex" mb={2} ml={1}>
          <IconButton onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
        </Box>

        <List>
  {menuItems.map(({ icon, label, path }, index) => {
    const active = isActive(path);

    const listItem = (
      <ListItem
        button
        key={index}
        component={Link}
        to={path}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          px: 2,
          mb: 1,
          borderRadius: 2,
          textDecoration: 'none',
          color: active ? theme.palette.primary.main : 'inherit',
          bgcolor: active ? theme.palette.action.selected : 'transparent',
          '&:hover': {
            bgcolor: theme.palette.action.hover,
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 2 }}>
          {icon}
        </ListItemIcon>
        {!collapsed && <ListItemText primary={label} />}
      </ListItem>
    );

    return (
      <Tooltip
        key={label}
        title={collapsed ? label : ''}
        placement="right"
        arrow
        disableHoverListener={!collapsed}
      >
        <span style={{ display: 'block' }}>{listItem}</span>
      </Tooltip>
    );
  })}
</List>

      </Box>

      {/* Bottom Section: Logout */}
      <Box mb={2}>
        <Divider sx={{ mb: 1 }} />
        <Tooltip title={collapsed ? 'Logout' : ''} placement="right" arrow disableHoverListener={!collapsed}>
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: 2,
              borderRadius: 2,
              '&:hover': {
                bgcolor: theme.palette.error.light,
                color: theme.palette.error.contrastText,
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 2 }}>
              <LogoutIcon />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Logout" />}
          </ListItem>
        </Tooltip>
      </Box>
    </Box>
  );
};
