const mongoose = require('mongoose');

const chatRequestSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'senderModel',
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'receiverModel',
  },
  senderModel: {
    type: String,
    required: true,
    enum: ['Doctor', 'Patient'],
  },
  receiverModel: {
    type: String,
    required: true,
    enum: ['Doctor', 'Patient'],
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('ChatRequest', chatRequestSchema);
