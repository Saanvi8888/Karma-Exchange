const Message = require("../models/Messages")
const Trade = require("../models/Trade");

exports.sendMessage = async (req, res) => {
  try {
    const { tradeId, content } = req.body;
    const senderId = req.user.id;

    if (!tradeId || !content?.trim()) {
      return res.status(400).json({ message: "tradeId and content are required" });
    }

    const trade = await Trade.findById(tradeId);
    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }

    if (
      trade.user.toString() !== senderId &&
      trade.acceptedBy?.toString() !== senderId
    ) {
      return res.status(403).json({ message: "Not allowed to chat in this trade" });
    }

    const receiverId =trade.user.toString() === senderId?trade.acceptedBy: trade.user;

    if (!receiverId) {
      return res.status(400).json({ message: "Trade not accepted yet" });
    }

    const message = await Message.create({
      trade: tradeId,
      sender: senderId,
      receiver: receiverId,
      content: content.trim(),
    });

    const populatedMessage = await message.populate(
      "sender receiver",
      "username "
    );

    req.app.get("io").to(tradeId).emit("newMessage", populatedMessage);

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getTradeMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tradeId } = req.params;
    const { page = 1, limit = 30 } = req.query;

    const trade = await Trade.findById(tradeId);
    if (!trade) return res.status(404).json({ message: "Trade not found" });

    if (
      trade.user.toString() !== userId &&
      trade.acceptedBy?.toString() !== userId
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const messages = await Message.find({ trade: tradeId })
      .populate("sender receiver", "username ")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(messages.reverse());
  } catch (error) {
    console.error("Get Messages Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.getUserChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: userId },
            { receiver: userId }
          ]
        }
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$trade",
          lastMessage: { $first: "$$ROOT" },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [{ $eq: ["$receiver", userId] }, { $eq: ["$isRead", false] }] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    res.json(chats);
  } catch (error) {
    console.error("Get Chats Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.markMessagesAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tradeId } = req.params;

    await Message.updateMany(
      {
        trade: tradeId,
        receiver: userId,
        isRead: false,
      },
      { isRead: true }
    );

    res.json({ message: "Messages marked as read" });
  } catch (error) {
    console.error("Mark Read Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};