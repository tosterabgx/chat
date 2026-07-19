import { parseCookie } from "cookie";
import { verifyToken } from "../lib/utils.js";

export const protectedSocket = (socket, next) => {
  const cookies = parseCookie(socket.handshake.headers.cookie ?? "");
  const token = verifyToken(cookies.jwt);
  socket.username = token?.username ?? "guest";
  next();
};
