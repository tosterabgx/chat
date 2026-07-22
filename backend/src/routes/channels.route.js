import { Router } from "express";
import { getChannels } from "../controllers/channels.controller.js";

const router = Router();

router.get("/", getChannels);

export default router;
