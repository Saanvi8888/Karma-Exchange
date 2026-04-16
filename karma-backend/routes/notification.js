const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");
const  getUserNotifications  = require("../controllers/NotificationController");

router.get("/", protect, getUserNotifications);

module.exports = router;
