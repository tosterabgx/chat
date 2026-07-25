import mongoose from "mongoose";
import Message from "../models/message.model.js";

export function formatMessage(msg, sender = msg.senderId) {
  return {
    id: msg._id,
    channelId: msg.channelId,
    text: msg.text,
    sender: {
      id: sender._id,
      username: sender.username,
    },
  };
}

export const getMessages = async (req, res) => {
  try {
    const { channelId } = req.params;
    if (!mongoose.isValidObjectId(channelId)) {
      return res.status(400).json({ message: "Invalid channelId" });
    }

    const data = await Message.find({ channelId })
      .sort({ createdAt: 1 })
      .populate("senderId", "username");
    res.status(200).json({ messages: data.map((m) => formatMessage(m)) });
  } catch (error) {
    console.error("Error in getMessages controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
