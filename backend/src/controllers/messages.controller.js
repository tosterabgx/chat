import mongoose from "mongoose";
import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
  try {
    const { channelId } = req.params;
    if (!mongoose.isValidObjectId(channelId)) {
      return res.status(400).json({ message: "Invalid channelId" });
    }

    const data = await Message.find({ channelId });
    res.status(200).json({ messages: data });
  } catch (error) {
    console.error("Error in getMessages controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
