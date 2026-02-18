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
router.get("/deadline/:taskId", verifyJWT, suggestDeadline);
router.get("/deadline/:taskId", verifyJWT, suggestPriority);

export default router;
