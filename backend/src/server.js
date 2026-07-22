import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { connectDB, seed } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import authRoutes from "./routes/auth.route.js";
import channelsRoutes from "./routes/channels.route.js";
import messagesRoutes from "./routes/messages.route.js";

dotenv.config();

const port = process.env.PORT ?? 3001;

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/channels", channelsRoutes);
app.use("/api/messages", messagesRoutes);

connectDB()
  .then(seed)
  .then(() => {
    server.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
