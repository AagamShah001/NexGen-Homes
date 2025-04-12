import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Divider,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Chip,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { text: 'Review property submissions', completed: false },
    { text: 'Reply to user complaints', completed: true },
  ]);
  const [newTask, setNewTask] = useState('');

  const handleAdd = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleToggle = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="todo-content"
        id="todo-header"
        sx={{ bgcolor: '#f5f5f5' }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <TaskAltIcon color="primary" />
          <Typography variant="h6">ToDo List</Typography>
          <Chip label={`${tasks.length} Tasks`} size="small" color="info" />
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Box component={Paper} elevation={2} p={3} borderRadius={2}>
          {/* Task input */}
          <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
            <TextField
              label="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              fullWidth
              size="small"
            />
            <Button variant="contained" onClick={handleAdd} sx={{ whiteSpace: 'nowrap' }}>
              Add Task
            </Button>
          </Box>

          {/* Task List */}
          <List>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    disablePadding
                    secondaryAction={
                      <Tooltip title="Delete Task">
                        <IconButton edge="end" onClick={() => handleDelete(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    }
                    sx={{
                      bgcolor: task.completed ? '#f0f0f0' : 'transparent',
                      borderRadius: 1,
                      px: 2,
                    }}
                  >
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleToggle(index)}
                      sx={{ color: 'primary.main' }}
                    />
                    <ListItemText
                      primary={task.text}
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'gray' : 'inherit',
                      }}
                    />
                  </ListItem>
                  {index < tasks.length - 1 && <Divider sx={{ my: 1 }} />}
                </React.Fragment>
              ))
            ) : (
              <Typography color="text.secondary" align="center" mt={2}>
                No tasks added yet.
              </Typography>
            )}
          </List>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
