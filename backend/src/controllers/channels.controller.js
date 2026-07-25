import Channel from "../models/channel.model.js";

const formatChannel = (channel) => {
  return {
    id: channel._id,
    name: channel.name,
    description: channel.description,
  };
};

export const getChannels = async (req, res) => {
  try {
    const data = await Channel.find();
    res.status(200).json({ channels: data.map(formatChannel) });
  } catch (error) {
    console.error("Error in getChannels controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
