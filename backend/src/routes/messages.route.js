import { Router } from "express";
import { getMessages } from "../controllers/messages.controller.js";

const router = Router();

router.get("/:channelId", getMessages);

export default router;
