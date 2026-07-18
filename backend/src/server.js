import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const port = process.env.PORT ?? 3001;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

connectDB().then(() => {
  server.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
