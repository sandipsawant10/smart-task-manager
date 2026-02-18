import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import aiRoutes from "./routes/ai.routes.js";

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/ai", aiRoutes);

export default app;
