const express = require("express");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const SocketIO = require("socket.io");
const socketHandler = require("./socket");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require("./routes/userRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const messageRoutes = require("./routes/socketRoutes");

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// seed the database
app.use("/api/seed", require("./routes/seedRoutes"));
// category routes
app.use("/api/category", categoryRoutes);
// register routes
app.use("/api/auth", authRoutes);
// appointment routes
app.use("/api/appointment", appointmentRoutes);
// upload routes
app.use("/api/upload", uploadRoutes);
// user routes
app.use("/api/user", userRoutes);
// password routes
app.use("/api/password", passwordRoutes);
// socket msgs routes
app.use("/api/socket", messageRoutes);

console.log("Starting the server...");

const server = http.createServer(app);

// add socket.io to the server
const wsServer = SocketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`DB connected`);
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
      socketHandler(wsServer);
    });
  })
  .catch((err) => {
    console.log(`database connection failed. server not started`);
    console.error(err);
  });
