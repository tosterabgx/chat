import { Router } from "express";
import {
  checkAuth,
  createGuest,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/guest", createGuest);

router.get("/me", protectedRoute, checkAuth);

export default router;
