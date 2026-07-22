import { Router } from "express";
import { getChannels } from "../controllers/channels.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectedRoute, getChannels);

export default router;
