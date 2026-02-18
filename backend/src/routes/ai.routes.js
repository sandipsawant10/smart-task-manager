import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { generateTasks, getFeedback } from "../controllers/ai.controller.js";

const router = Router();

router.post("/generate", verifyJWT, generateTasks);
router.get("/feedback", verifyJWT, getFeedback);

export default router;
