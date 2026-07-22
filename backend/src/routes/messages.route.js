import { Router } from "express";
import { getMessages } from "../controllers/messages.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/:channelId", protectedRoute, getMessages);

export default router;
