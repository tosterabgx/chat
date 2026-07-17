import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    text: String,
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
