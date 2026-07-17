import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

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

app.use(express.json());
app.use("/api/auth", authRoutes);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
  connectDB();
});
