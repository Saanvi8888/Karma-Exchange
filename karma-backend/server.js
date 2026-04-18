const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const tradeRoutes = require("./routes/trade");
const notificationRoutes = require("./routes/notification");
const messageRoutes = require("./routes/message");
dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trades", tradeRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Karma is working" });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  // console.log("User connected:", socket.id);

  socket.on("join_trade", (tradeId) => {
    socket.join(tradeId);
    // console.log(`Joined trade room: ${tradeId}`);
  });

  socket.on("disconnect", () => {
    // console.log(" User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(` Server running on port ${PORT}`)
);