import { verifyToken } from "../lib/utils.js";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No Token Provided" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }

  if (!decoded.guest) {
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
  } else {
    req.user = { username: decoded.username };
  }

  next();
};
