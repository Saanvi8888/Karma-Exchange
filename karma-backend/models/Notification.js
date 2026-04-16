const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  tradeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trade",
    required: true
  },

  message: {
    type: String,
    required: true
  },

  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true   
});

module.exports = mongoose.model("Notification", NotificationSchema);
