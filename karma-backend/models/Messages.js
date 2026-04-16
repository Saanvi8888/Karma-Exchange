const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    trade: {
      type: mongoose.Schema.ObjectId,
      ref: "Trade",
      required: true,
      index: true, // fast chat lookup per trade
    },

    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    messageType: {
      type: String,
      enum: ["text", "image", "system"],
      default: "text",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);