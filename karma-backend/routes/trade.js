
const express = require("express");
const router = express.Router();
const { 
  createTrade, 
  getTrades, 
  getTradeById,
  getMyTrades,
  acceptTrade,
  completeTrade,
  cancelTrade,
  deleteTrade,
  getDashboardTrades,
  getAllTrades,
  getInterestedTrades,
  getMyChatTrades,
  trendingSkills,
  
} = require("../controllers/TradeController");
const { protect } = require("../middleware/auth");
router.post("/", protect, createTrade);
router.get("/dashboard", protect, getDashboardTrades);
router.get("/", protect, getAllTrades);
router.get("/my-trades", protect, getInterestedTrades);
router.get("/my-chats", protect, getMyChatTrades);
router.get("/my", protect, getMyTrades);
router.get("/:id", protect, getTradeById);
router.post("/:id/accept", protect, acceptTrade);
router.post("/:id/complete", protect, completeTrade);
router.post("/:id/cancel", protect, cancelTrade);
router.delete("/:id", protect, deleteTrade);
module.exports = router;
