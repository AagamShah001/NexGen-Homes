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
  Tooltip,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const Property = () => {
  const [property, setProperty] = useState([]);

  const getAllProperty = async () => {
    try {
      const res = await axios.get('/property/getallproperty');
      setProperty(res.data.data);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    }
  };


  useEffect(() => {
    getAllProperty();
  }, []);

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="property-panel-content"
        id="property-panel-header"
        sx={{ bgcolor: '#f5f5f5' }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <HomeWorkIcon color="primary" />
          <Typography variant="h6">Properties</Typography>
          <Typography variant="body2" color="text.secondary">
            ({property.length} Listed)
          </Typography>
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Paper elevation={2} sx={{ borderRadius: 2 }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
                <TableRow>
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Location</strong></TableCell>
                  <TableCell><strong>Created Date</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {property.map((prop, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell>
                      <Avatar
                        variant="rounded"
                        src={prop.image || ''}
                        alt={prop.name || 'Property'}
                        sx={{ width: 60, height: 60, borderRadius: 2 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {prop.name || 'Unnamed Property'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {`${prop.stateId.name || 'N/A'}, ${prop.cityId.name || 'N/A'}, ${prop.areaId.name || 'N/A'}`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(prop.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Remove Property">
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
                {property.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        No properties found.
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
