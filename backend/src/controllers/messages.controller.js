import mongoose from "mongoose";
import Message from "../models/message.model.js";

export function formatMessage(msg) {
  return {
    id: msg._id,
    senderId: msg.senderId,
    text: msg.text,
  };
}

export const getMessages = async (req, res) => {
  try {
    const { channelId } = req.params;
    if (!mongoose.isValidObjectId(channelId)) {
      return res.status(400).json({ message: "Invalid channelId" });
    }

    const data = await Message.find({ channelId }).sort({ createdAt: 1 });
    res.status(200).json({ messages: data.map(formatMessage) });
  } catch (error) {
    console.error("Error in getMessages controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
