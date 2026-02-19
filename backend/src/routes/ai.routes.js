import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  generateTasks,
  getFeedback,
  suggestDeadline,
  suggestPriority,
} from "../controllers/ai.controller.js";

const router = Router();

router.post("/generate", verifyJWT, generateTasks);
router.get("/feedback", verifyJWT, getFeedback);
router.post("/deadline", verifyJWT, suggestDeadline);
router.post("/priority", verifyJWT, suggestPriority);

export default router;
