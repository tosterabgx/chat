import express from "express";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { formatMessage } from "../controllers/messages.controller.js";
import { protectedSocket } from "../middleware/socket.middleware.js";
import Message from "../models/message.model.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

io.use(protectedSocket);

io.on("connection", (socket) => {
  socket.on("message:new", async (msg) => {
    try {
      if (!mongoose.isValidObjectId(msg.channelId)) return;
      if (msg.text.length > 512) return;

      const newMessage = await Message.create({
        channelId: msg.channelId,
        senderId: socket.user._id,
        text: msg.text,
      });

      io.emit("message:new", formatMessage(newMessage));
    } catch (error) {
      console.error("Error in message:new socket:", error.message);
    }
  });
});

export { app, io, server };
