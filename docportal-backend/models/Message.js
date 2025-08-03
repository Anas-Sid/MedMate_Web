const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
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
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
