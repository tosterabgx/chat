import bcrypt from "bcrypt";
import { generateToken } from "../lib/auth.js";
import User from "../models/user.model.js";

const formatUser = (user) => {
  return {
    id: user._id,
    username: user.username,
    guest: user.guest ?? false,
  };
};

const sendAuthResponse = (user, res) => {
  generateToken({ id: user._id }, res);
  res.status(200).json({ user: formatUser(user) });
};

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body ?? {};
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.exists({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, password: hashedPassword });

    sendAuthResponse(newUser, res);
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body ?? {};
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username }).select("+password");
    if (!user || user.guest || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    sendAuthResponse(user, res);
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createGuest = async (req, res) => {
  try {
    const username = `guest_${Math.random().toString(36).slice(2, 8)}`;
    const user = await User.create({ username, guest: true });

    sendAuthResponse(user, res);
  } catch (error) {
    if (error.code === 11000) {
      return createGuest(req, res);
    } else {
      console.error("Error in createGuest controller:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ user: formatUser(req.user) });
  } catch (error) {
    console.error("Error in checkAuth controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
