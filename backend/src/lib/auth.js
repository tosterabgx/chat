import jwt from "jsonwebtoken";

export const sendAuthResponse = (user, res) => {
  const payload = {
    id: user._id,
    username: user.username,
    guest: user.guest ?? false,
  };

  generateToken(payload, res);

  res.status(200).json({ user: payload });
};

export const generateToken = (data, res) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};
