import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
  try {
    const data = await Message.find();
    res.status(200).json({ messages: data });
  } catch (error) {
    console.error("Error in getMessages controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
