const Trade = require("../models/Trade");
const User = require("../models/User");
const Notification  = require("../models/Notification");
exports.createTrade = async (req, res) => {
  try {
    const trade = await Trade.create({
      user: req.user._id,
      karmaValue: Number(req.body.karmaValue),
      title: req.body.title,
      description: req.body.description,
      offer: req.body.offer,
      lookingFor: req.body.lookingFor,
      category: req.body.category,
      tags: req.body.tags || [],
      duration: req.body.duration,
    });

    await trade.populate("user", "username ");

    res.status(201).json({
      success: true,
      data: trade,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDashboardTrades = async (req, res) => {
  try {
    const myId = req.user._id;

    const trades = await Trade.find({
      status: "active",
      user: { $ne: myId },
      $or: [
        { acceptedBy: null },
        { acceptedBy: { $exists: false } }
      ]
    })
      .populate("user", "username  karma")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({ success: true, data: trades });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllTrades = async (req, res) => {
  try {
    const {
      search,
      category,
      page = 1,
      limit = 20,
    } = req.query;

    const query = { status: "active" };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { offer: { $regex: search, $options: "i" } },
        { lookingFor: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (category && category !== "all") {
      query.category = category;
    }

    const trades = await Trade.find(query)
      .populate("user", "username  karma")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Trade.countDocuments(query);

    res.json({
      success: true,
      data: trades,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.getTradeById = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id).populate(
      "user acceptedBy",
      "username karma skills"
    );

    if (!trade) {
      return res.status(404).json({
        success: false,
        message: "Trade not found",
      });
    }

    res.json({
      success: true,
      data: trade,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyTrades = async (req, res) => {
  try {
    const trades = await Trade.find({
      $or: [
        { user: req.user._id },
        { acceptedBy: req.user._id }
      ]
    })
      .populate("acceptedBy", "username ")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: trades,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getMyChatTrades = async (req, res) => {
  try {
    const trades = await Trade.find({
      status: { $in: ["in-progress", "completed"] },
      $or: [
        { user: req.user._id },
        { acceptedBy: req.user._id }
      ]
    })
      .populate("acceptedBy", "username ")
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      data: trades
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getInterestedTrades = async (req, res) => {
  
  try {
    const myId = req.user._id;

    const trades = await Trade.find({
      $or: [
        { user: myId },
        { acceptedBy: myId }
      ]
    })
      .populate("user", "username  karma")
      .populate("acceptedBy", "username  karma")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: trades
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.acceptTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);

    if (!trade || trade.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Trade not available",
      });
    }

    if (trade.user.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot accept your own trade",
      });
    }

    trade.acceptedBy = req.user._id;
    trade.status = "in-progress";
    await trade.save();

    await Notification.create({
      sender: req.user._id,      // accepter
      receiver: trade.user,      // trade owner
      tradeId: trade._id,
      type: "TRADE_ACCEPTED",
      message: "Your trade has been accepted",
    });
    res.json({
      success: true,
      message: "Trade accepted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.completeTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);
    const userId = req.user._id;

    if (!trade || trade.status !== "in-progress") {
      return res.status(400).json({
        success: false,
        message: "Trade cannot be completed",
      });
    }

    const isParticipant =
      trade.user.toString() === userId.toString() ||
      trade.acceptedBy.toString() === userId.toString();

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: "You are not part of this trade",
      });
    }
    const alreadyConfirmed = trade.completionConfirmedBy.some(
      (id) => id.toString() === userId.toString()
    );

    if (alreadyConfirmed) {
      return res.status(400).json({
        success: false,
        message: "You have already confirmed completion",
      });
    }

    trade.completionConfirmedBy.push(userId);
    await trade.save();

    const bothConfirmed =
      trade.completionConfirmedBy.includes(trade.user) &&
      trade.completionConfirmedBy.includes(trade.acceptedBy);

    if (bothConfirmed) {
      if (trade.status === "completed") {
        return res.json({
          success: true,
          message: "Trade already completed",
          status: "completed",
        });
      }

      const karma = trade.karmaValue ?? 10;

      await User.findByIdAndUpdate(trade.user, {
        $inc: { karma: karma, completedSessions: 1 },
      });

      await User.findByIdAndUpdate(trade.acceptedBy, {
        $inc: { karma: karma, completedSessions: 1 },
      });

      trade.status = "completed";
      await trade.save();

      return res.json({
        success: true,
        message: "Trade completed successfully",
        status: "completed",
      });
    }

    return res.json({
      success: true,
      message: "Completion confirmed - waiting for the other user",
      status: "awaiting_confirmation",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.cancelTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);

    if (!trade) {
      return res.status(404).json({
        success: false,
        message: "Trade not found",
      });
    }
    if (
      trade.user.toString() !== req.user._id.toString() &&
      trade.acceptedBy?.toString() !== req.user._id.toString()
    ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
    if (trade.status === "completed") {
      return res.status(400).json({ success: false, message: "Completed trades cannot be cancelled" });
    }
    trade.status = "cancelled";
    trade.completionConfirmedBy=[]
    await trade.save();
    res.json({
      success: true,
      message: "Trade cancelled",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);
    if (!trade) {
      return res.status(404).json({
        success: false,
        message: "Trade not found",
      });
    }
    if (trade.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
    if (trade.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Only active trades can be deleted",
      });
    }
    await trade.deleteOne();

    res.json({
      success: true,
      message: "Trade deleted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
