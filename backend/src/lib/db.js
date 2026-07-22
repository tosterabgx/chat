import mongoose from "mongoose";
import Channel from "../models/channel.model.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export const seed = async () => {
  const general = await Channel.findOne({ name: "general" });
  if (!general) {
    await Channel.create({ name: "general", description: "Say hi!" });
  }

  const random = await Channel.findOne({ name: "random" });
  if (!random) {
    await Channel.create({ name: "random", description: "random stuff" });
  }
};
