const ChatRequest = require('../models/ChatRequest');
const Message = require('../models/Message');

//  Send a new chat request
exports.sendChatRequest = async (req, res) => {
  const { senderId, receiverId, senderModel, receiverModel } = req.body;
  
  try {
    // Check if already sent
    const existing = await ChatRequest.findOne({
      senderId,
      receiverId,
      senderModel,
      receiverModel,
    });

    if (existing) {
      return res.status(400).json({ message: 'Request already sent.' });
    }

    const request = new ChatRequest({
      senderId,
      receiverId,
      senderModel,
      receiverModel,
    });

    await request.save();
    res.status(201).json({ message: 'Request sent', request });
  } catch (err) {
    console.error('Send chat request error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Accept or reject a chat request
exports.respondToChatRequest = async (req, res) => {
  const { requestId } = req.params;
  const { action } = req.body; // 'accepted' or 'rejected'

  if (!['accepted', 'rejected'].includes(action)) {
    return res.status(400).json({ message: 'Invalid action' });
  }

  try {
    const updated = await ChatRequest.findByIdAndUpdate(
      requestId,
      { status: action },
      { new: true }
    );

    res.json({ message: `Request ${action}`, request: updated });
  } catch (err) {
    console.error('Respond to chat request error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get pending chat requests for a user
exports.getChatRequests = async (req, res) => {
  const userId = req.params.userId;       // ✅ get from params
  const { userModel } = req.query; 

  try {
    const requests = await ChatRequest.find({
      receiverId: userId,
      receiverModel: userModel,
      status: 'pending',
    }).populate('senderId');

    res.json(requests);
  } catch (err) {
    console.error('Get pending requests error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// ✅ Get accepted chat list for a user (for sidebar)
exports.getAcceptedChats = async (req, res) => {
  const { userId, userModel } = req.query;

  try {
    const chats = await ChatRequest.find({
      $or: [
        { senderId: userId, senderModel: userModel },
        { receiverId: userId, receiverModel: userModel },
      ],
      status: 'accepted',
    }).populate('senderId receiverId');

    res.json(chats);
  } catch (err) {
    console.error('Get accepted chats error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// ✅ Send a message (after chat is accepted)
exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, senderModel, receiverModel, content } = req.body;

  try {
    const message = new Message({
      senderId,
      receiverId,
      senderModel,
      receiverModel,
      content,
    });

    await message.save();
    res.status(201).json(message);
  } catch (err) {
    console.error('Send message error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// ✅ Get all messages between two users
exports.getMessages = async (req, res) => {
  const { user1Id, user2Id } = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: user1Id, receiverId: user2Id },
        { senderId: user2Id, receiverId: user1Id },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error('Get messages error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAcceptedChats = async (req, res) => {
  const { userId } = req.params;
  const { userModel } = req.query;

  try {
    const chats = await ChatRequest.find({
      $or: [
        { senderId: userId, senderModel: userModel },
        { receiverId: userId, receiverModel: userModel },
      ],
      status: 'accepted',
    }).populate('senderId receiverId');

    res.json(chats);
  } catch (err) {
    console.error('Get accepted chats error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



