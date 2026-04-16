const Notification = require("../models/Notification")
const User = require('../models/User')
const Trade = require("../models/Trade")

const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification
      .find({ receiver: req.user.id })
      .populate("sender", "username")
      .populate("tradeId", "offer lookingFor")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports =  getUserNotifications ;