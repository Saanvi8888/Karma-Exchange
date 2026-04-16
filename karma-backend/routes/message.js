const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getTradeMessages,
  markMessagesAsRead,
  getUserChats
} = require("../controllers/MessageController");
const {protect} = require("../middleware/auth");
const Messages = require("../models/Messages");
router.get("/:tradeId", protect, async (req, res) => {
  try {
    const messages = await Messages.find({ trade: req.params.tradeId })
      .sort({ createdAt: 1 }) 
      .populate("sender", "username"); 
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/", protect, sendMessage);
router.get("/:tradeId", protect, getTradeMessages);
router.patch("/read/:tradeId", protect, markMessagesAsRead);
router.get("/", protect, getUserChats);


module.exports = router;