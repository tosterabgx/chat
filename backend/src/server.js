import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
