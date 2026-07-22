import { parseCookie } from "cookie";
import { verifyToken } from "../lib/utils.js";

export const protectedSocket = (socket, next) => {
  const cookies = parseCookie(socket.handshake.headers.cookie ?? "");
  const token = cookies.jwt;
  if (!token) {
    return next(new Error("Unauthorized - No Token Provided"));
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return next(new Error("Unauthorized - Invalid Token"));
  }

  socket.username = decoded.username;
  next();
};
