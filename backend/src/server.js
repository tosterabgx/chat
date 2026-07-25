import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { connectDB, seed } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import authRoutes from "./routes/auth.route.js";
import channelsRoutes from "./routes/channels.route.js";

dotenv.config();

const port = process.env.PORT ?? 3001;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/channels", channelsRoutes);

connectDB()
  .then(seed)
  .then(() => {
    server.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
