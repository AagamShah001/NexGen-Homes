import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupIcon from '@mui/icons-material/Group';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const Users = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await axios.get('/user/users');
      setUsers(res.data.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'error';
      case 'moderator':
        return 'warning';
      case 'user':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="user-panel-content"
        id="user-panel-header"
        sx={{ bgcolor: '#f5f5f5' }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <GroupIcon color="primary" />
          <Typography variant="h6">Users</Typography>
          <Typography variant="body2" color="text.secondary">
            ({users.length} Registered)
          </Typography>
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Paper elevation={2} sx={{ borderRadius: 2 }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
                <TableRow>
                  <TableCell><strong>Avatar</strong></TableCell>
                  <TableCell><strong>Username</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Created Date</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell>
                      <Avatar
                        src={user.profilePicture || ''}
                        alt={user.firstname}
                        sx={{ width: 45, height: 45 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={500}>
                        {user.firstname} {user.lastname}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.email || 'No email'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.role?.name || 'Unknown'}
                        size="small"
                        color={getRoleColor(user.role?.name)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(user.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Remove User">
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          startIcon={<DeleteOutlineIcon />}
                        >
                          Remove
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        No users found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
};
