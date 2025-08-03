const express = require('express');
const router = express.Router();

const {
  sendChatRequest,
  getChatRequests,
  respondToChatRequest,
  getAllChats,
  sendMessage,
  getMessages,
  getAcceptedChats,
  getAllPatients,
} = require('../controllers/chatController');

// Send a chat request (patient → doctor or doctor → patient)
router.post('/request', sendChatRequest);

// Get all chat requests for the logged-in user (doctor or patient)
router.get('/requests/:userId', getChatRequests);

// Accept or reject a request
router.put('/respond/:requestId', respondToChatRequest);

// Get all accepted chat connections for sidebar
router.get('/connections/:userId', getAcceptedChats);

// Send a message
router.post('/message', sendMessage);

router.get('/connections/:userId', getAcceptedChats);

// Get messages between two users
router.get('/messages', getMessages);



module.exports = router;
