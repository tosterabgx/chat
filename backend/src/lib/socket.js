import express from "express";
import http from "http";
import { Server } from "socket.io";
import Message from "../models/message.model.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("message", async (msg) => {
    await Message.create({ text: msg });
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

export { app, io, server };
