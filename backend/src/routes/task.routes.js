import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = Router();

router.route("/").post(verifyJWT, createTask).get(verifyJWT, getMyTasks);

router.route("/:id").put(verifyJWT, updateTask).delete(verifyJWT, deleteTask);

export default router;
