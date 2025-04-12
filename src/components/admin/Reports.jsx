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
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

export const Reports = () => {
  const [reports, setReports] = useState([]);

  const getAllReports = async () => {
    try {
      const res = await axios.get('/getallcomplaint');
      setReports(res.data.data);
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
    }
  };

  useEffect(() => {
    getAllReports();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Closed':
        return 'default';
      default:
        return 'info';
    }
  };

  // Summary counts
  const openCount = reports.filter(r => r.status === 'Open').length;
  const pendingCount = reports.filter(r => r.status === 'Pending').length;
  const closedCount = reports.filter(r => r.status === 'Closed').length;

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="reports-content"
        id="reports-header"
        sx={{ bgcolor: '#f5f5f5' }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <ReportProblemIcon color="primary" />
          <Typography variant="h6">Complaints Report</Typography>
          <Chip label={`Open: ${openCount}`} color="success" size="small" />
          <Chip label={`Pending: ${pendingCount}`} color="warning" size="small" />
          <Chip label={`Closed: ${closedCount}`} color="default" size="small" />
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
              <TableRow>
                <TableCell><strong>User</strong></TableCell>
                <TableCell><strong>Subject</strong></TableCell>
                <TableCell><strong>Message</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {reports.map((report) => (
                <TableRow key={report._id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar
                        src={report.userId?.image || ''}
                        alt={report.userId?.firstname || 'User'}
                      />
                      <Typography variant="body2">
                        {report.userId
                          ? `${report.userId.firstname} ${report.userId.lastname}`
                          : 'Unknown User'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{report.subject}</TableCell>
                  <TableCell>{report.message}</TableCell>
                  <TableCell>
                    <Chip
                      label={report.status}
                      color={getStatusColor(report.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}

              {reports.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No complaints found.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};
