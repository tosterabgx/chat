import Channel from "../models/channel.model.js";

export const getChannels = async (req, res) => {
  try {
    const data = await Channel.find();
    res.status(200).json({ channels: data });
  } catch (error) {
    console.error("Error in getChannels controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
