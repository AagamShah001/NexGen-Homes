import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Button,
  Paper,
  ClickAwayListener,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`/getnotify/${userId}`);
      setNotifications(res.data.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const markAllAsRead = async () => {
    try {
      const res = await axios.put(`/notifyread/${userId}`);
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
    } catch (err) {
      console.error('Failed to mark notifications as read:', err);
    }
  };

  const handleDeleteNotification = async (notifId) => {
    try {
      const delres = await axios.delete(`/deletenotify/${notifId}/${userId}`);
      setNotifications((prev) => prev.filter((n) => n._id !== notifId));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div style={{ position: 'relative' }}>
        <IconButton onClick={() => { handleToggle(); markAllAsRead();fetchNotifications(); }} color="inherit">
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {open && (
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              right: 0,
              mt: 1,
              width: 320,
              maxHeight: 400,
              overflowY: 'auto',
              zIndex: 10,
              p: 1,
            }}
          >

            <List>
              {notifications.length === 0 ? (
                <ListItem>
                  <ListItemText primary="No notifications" />
                </ListItem>
              ) : (
                notifications.map((notif) => (
                  <ListItem
                    key={notif._id}
                    component={Link}
                    to={notif.link || '#'}
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit',
                      backgroundColor: notif.isRead ? 'transparent' : '#f5f5f5',
                      '&:hover': {
                        backgroundColor: '#e0e0e0',
                        borderRadius: 2
                      },
                      alignItems: 'flex-start',
                      position: 'relative'
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src="" />
                    </ListItemAvatar>

                    {/* Message and time */}
                    <ListItemText
                      primary={<Typography variant="body2">{notif.message}</Typography>}
                      secondary={new Date(notif.createdAt).toLocaleString()}
                    />

                    {/* Delete icon aligned right using Box */}
                    <Box
                      sx={{
                        ml: 'auto',
                        alignSelf: 'center'
                      }}
                      onClick={(e) => {
                        handleDeleteNotification(notif._id);
                      }}
                    >
                      <IconButton edge="end" aria-label="delete">
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))
              )}
            </List>



          </Paper>
        )}
      </div>
    </ClickAwayListener >
  );
};
