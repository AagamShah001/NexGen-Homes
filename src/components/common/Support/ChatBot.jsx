import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Chip,
  Stack,
  Fab,
  Zoom,
  IconButton,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';


export const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const chatEndRef = useRef(null);
  const [isRaisingComplaint, setIsRaisingComplaint] = useState(false);
  const [complaintCategory, setComplaintCategory] = useState('');
  const userId = localStorage.getItem('id');


  const raisecomplaint = async ({ subject, message, userId }) => {
    try {
      const res = await axios.post('/addcomplaint', {
        subject,
        message,
        userId,
      });
      console.log("Complaint submitted:", res.data.data);
    } catch (error) {
      console.error("Complaint error:", error);
      throw error;
    }
  };


  const predefinedOptions = [
    "Raise a complaint",
    "Issue with property",
    "Issue with account",
  ];  

  useEffect(() => {
    if (open) {
      const introMessages = [
        { text: "👋 Welcome!", from: "bot" },
        { text: "We're here to help you out.", from: "bot" },
        { text: "Select one of the options below or type your issue.", from: "bot" },
      ];
      let delay = 0;
      introMessages.forEach((msg, i) => {
        setTimeout(() => {
          setMessages(prev => [...prev, msg]);
          if (i === introMessages.length - 1) setShowOptions(true);
        }, delay);
        delay += 800;
      });
    } else {
      setMessages([]);
      setShowOptions(false);
    }
  }, [open]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUserMessage = async (text) => {
    if (!text.trim()) return;
  
    setShowOptions(false);
    const userMsg = { text, from: 'user' };
    setMessages(prev => [...prev, userMsg]);
  
    // Check if user is not logged in
    if (!userId) {
      setMessages(prev => [...prev, { text: "⚠️ Please log in to raise a complaint.", from: 'bot' }]);
      setInput('');
      return;
    }
  
    // Complaint flow
    if (isRaisingComplaint && complaintCategory) {
      const complaintData = {
        subject: complaintCategory,
        message: text,
        userId: userId,
      };
  
      try {
        await raisecomplaint(complaintData);
        setMessages(prev => [...prev, { text: "✅ Your complaint has been submitted!", from: 'bot' }]);
      } catch (err) {
        setMessages(prev => [...prev, { text: "❌ Failed to submit your complaint. Please try again later.", from: 'bot' }]);
      }
  
      setIsRaisingComplaint(false);
      setComplaintCategory('');
    } else {
      if (
        text === "Raise a complaint" ||
        text === "Issue with property" ||
        text === "Issue with account"
      ) {
        setIsRaisingComplaint(true);
        setComplaintCategory(text);
        setMessages(prev => [
          ...prev,
          { text: "Please describe your issue in more detail so we can assist you.", from: 'bot' }
        ]);
      } else {
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { text: "Thanks for reaching out! We'll get back to you shortly.", from: 'bot' },
          ]);
        }, 1000);
      }
    }
  
    setInput('');
  };
  
  
  

  return (
    <>
      {/* Floating Action Button */}
      <Fab
        color="primary"
        onClick={() => setOpen(prev => !prev)}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 999,
        }}
      >
        <ChatIcon />
      </Fab>

      {/* Chat Window */}
      <Zoom in={open}>
        <Paper
          elevation={5}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            width: 360,
            maxHeight: 500,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              py: 1,
            }}
          >
            <Typography variant="subtitle1">NexGen Assistant</Typography>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Chat Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: 2,
              py: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              bgcolor: '#f9f9f9',
            }}
          >
            {messages.map((msg, i) => (
              <Box
                key={i}
                alignSelf={msg.from === 'user' ? 'flex-end' : 'flex-start'}
                sx={{
                  bgcolor: msg.from === 'user' ? '#1976d2' : '#e0e0e0',
                  color: msg.from === 'user' ? 'white' : 'black',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: '80%',
                }}
              >
                {msg.text}
              </Box>
            ))}

            {/* Options inside chat stream */}
            {showOptions && (
              <Box alignSelf="flex-start">
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                  {predefinedOptions.map((opt, i) => (
                    <Chip
                      key={i}
                      label={opt}
                      color="primary"
                      variant="outlined"
                      size="small"
                      onClick={() => handleUserMessage(opt)}
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Stack>
              </Box>
            )}

            <div ref={chatEndRef} />
          </Box>

          {/* Input */}
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleUserMessage(input);
            }}
            sx={{ px: 2, py: 1, display: 'flex', gap: 1 }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button variant="contained" type="submit">Send</Button>
          </Box>
        </Paper>
      </Zoom>
    </>
  );
};
