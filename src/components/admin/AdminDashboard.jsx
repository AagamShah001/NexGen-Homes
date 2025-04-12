// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AdminSidebar } from './AdminSidebar';
import { Charts } from './Charts';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Paper,
  useTheme,
  Divider,
} from '@mui/material';
import { Scheduler } from './Scheduler';
import { ToDoList } from './ToDoList';
import { Users } from './Users';
import { Property } from './Property';
import { Reports } from './Reports';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AdminNavbar } from './AdminNavbar';

export const AdminDashboard = () => {
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState(true);
  const [users, setUsers] = useState([]);
  const sidebarWidth = collapsed ? 60 : 200;

  const toggleSidebar = () => setCollapsed(prev => !prev);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/user/users');
        setUsers(res.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const dashboardCards = [
    {
      title: 'Monthly Income',
      value: '₹40,000',
      subtext: 'Total Income 98% ↑',
      icon: <MonetizationOnIcon />,
      color: 'success.main',
    },
    {
      title: 'Visits Today',
      value: '20',
      subtext: 'New Visits 44% ↑',
      icon: <VisibilityIcon />,
      color: 'primary.main',
    },
    {
      title: 'New Users',
      value: '10 this month',
      subtext: '5% ↑',
      icon: <TrendingUpIcon />,
      color: 'warning.main',
    },
    {
      title: 'Total Users',
      value: users.length,
      subtext: 'All registered users',
      icon: <GroupIcon />,
      color: 'info.main',
    },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      
      <Box sx={{ height: '64px', zIndex: 10 }}>
    <AdminNavbar />
  </Box>

      {/* Main content area with sidebar and content */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <AdminSidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />

      <Box
        sx={{
          ml: `${sidebarWidth}px`,
          transition: 'margin-left 0.3s',
          p: 5,
          bgcolor: '#f9fafb',
          width: '100%',
          minHeight: '100vh',
        }}
      >
        {/* Cards */}
        <Grid container spacing={1} sx={{mb: 3, justifyContent: 'space-between'}}>
          {dashboardCards.map((card, i) => (
            <Grid key={i}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 3,
                  pl: 5,
                  pr: 6,
                  bgcolor: 'white',
                }}
              >
                <Avatar sx={{ bgcolor: card.color, color: '#fff' }}>{card.icon}</Avatar>
                <Box>
                  <Typography fontWeight={600} variant="subtitle2">{card.title}</Typography>
                  <Typography variant="h6">{card.value}</Typography>
                  <Typography variant="caption" color="text.secondary">{card.subtext}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts */}
        <Paper elevation={3} sx={{ borderRadius: 4, p: 3, mb: 4 }}>
          <Typography variant="h6" mb={2}>Analytics Overview</Typography>
          <Charts />
        </Paper>

        <Divider sx={{ mb: 4 }} />

        {/* Panels */}
        <Grid container spacing={5}  sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Grid size={6}><Reports /></Grid>
          <Grid size={6}><Property /></Grid>
          <Grid><Users /></Grid>
          <Grid><ToDoList /></Grid>
          <Grid size={6}><Scheduler /></Grid>
        </Grid>
      </Box>
    </Box>
    </Box>
  );
};
