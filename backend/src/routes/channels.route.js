import { Router } from "express";
import { getChannels } from "../controllers/channels.controller.js";
import { getMessages } from "../controllers/messages.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectedRoute);

router.get("/", getChannels);
router.get("/:channelId/messages", getMessages);

export default router;
