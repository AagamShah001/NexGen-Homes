import React, { useState } from 'react';
import moment from 'moment';
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  TextField,
  Button,
  IconButton,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  CalendarToday as CalendarTodayIcon,
  Notes as NotesIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  EventNote as EventNoteIcon,
} from '@mui/icons-material';

export const Scheduler = () => {
  const [schedules, setSchedules] = useState([
    { dateTime: moment().toISOString(), message: 'Meeting with Design Team' },
    { dateTime: moment().add(1, 'day').toISOString(), message: 'Backend Deployment' },
    { dateTime: moment().add(2, 'days').toISOString(), message: 'Client Demo' },
  ]);

  const [newSchedule, setNewSchedule] = useState({
    dateTime: '',
    message: '',
  });

  const handleChange = (e) => {
    setNewSchedule({ ...newSchedule, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (newSchedule.dateTime && newSchedule.message) {
      setSchedules([...schedules, newSchedule]);
      setNewSchedule({ dateTime: '', message: '' });
    }
  };

  const handleDelete = (index) => {
    const updated = schedules.filter((_, i) => i !== index);
    setSchedules(updated);
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f5f5f5' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <EventNoteIcon color="primary" />
          <Typography variant="h6">Scheduler</Typography>
          <Chip label={`${schedules.length} Events`} size="small" color="info" />
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Box component={Paper} elevation={2} p={3} borderRadius={2}>
          {/* Add New Schedule Form */}
          <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
            <TextField
              label="Date & Time"
              name="dateTime"
              type="datetime-local"
              value={newSchedule.dateTime}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Message"
              name="message"
              value={newSchedule.message}
              onChange={handleChange}
              size="small"
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleAdd}
              sx={{ whiteSpace: 'nowrap' }}
              disabled={!newSchedule.dateTime || !newSchedule.message}
            >
              Add
            </Button>
          </Box>

          {/* Schedule List */}
          {schedules.length > 0 ? (
            <List>
              {schedules.map((schedule, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{ px: 2 }}
                    secondaryAction={
                      <Tooltip title="Delete">
                        <IconButton edge="end" onClick={() => handleDelete(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <Box>
                      <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          {moment(schedule.dateTime).format('hh:mm A')}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                        <CalendarTodayIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          {moment(schedule.dateTime).format('dddd, MMMM Do YYYY')}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <NotesIcon fontSize="small" color="action" />
                        <Typography variant="body2">{schedule.message}</Typography>
                      </Box>
                    </Box>
                  </ListItem>
                  {index !== schedules.length - 1 && <Divider sx={{ my: 1 }} />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography align="center" color="text.secondary">
              No scheduled events.
            </Typography>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
