import { verifyToken } from "../lib/auth.js";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  const { decoded, error } = verifyToken(req.cookies);
  if (error) {
    return res.status(401).json({ message: error });
  }

  const user = await User.findById(decoded.id).select("-password").lean();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  req.user = user;

  next();
};
