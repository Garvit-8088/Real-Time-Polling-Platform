require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");

const { Server } =
  require("socket.io");

const connectDB =
  require("./config/db");

const authRoutes =
  require("./routes/authRoutes");

const pollRoutes =
  require("./routes/pollRoutes");

const memberRoutes =
  require("./routes/memberRoutes");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

const server =
  http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

require("./sockets/socket")(io);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/polls",
  pollRoutes
);

app.use(
  "/api/members",
  memberRoutes
);


const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});