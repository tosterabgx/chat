import express from "express";
import http from "http";
import { Server } from "socket.io";
import Message from "../models/message.model.js";
import { protectedSocket } from "../middleware/socket.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

io.use(protectedSocket);

io.on("connection", (socket) => {
  socket.on("message", async (text) => {
    try {
      const newMessage = new Message({ username: socket.username, text });
      await newMessage.save();
      io.emit("message", newMessage);
    } catch (error) {
      console.error("Error in message socket:", error.message);
    }
  });
});

export { app, io, server };
