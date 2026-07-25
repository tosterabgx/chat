import { parseCookie } from "cookie";
import { verifyToken } from "../lib/auth.js";
import User from "../models/user.model.js";

export const protectedSocket = async (socket, next) => {
  const cookies = parseCookie(socket.handshake.headers.cookie ?? "");

  const { decoded, error } = verifyToken(cookies);
  if (error) {
    return next(new Error(error));
  }

  const user = await User.findById(decoded.id).select("-password").lean();
  if (!user) {
    return next(new Error("User not found"));
  }

  socket.user = user;

  next();
};
