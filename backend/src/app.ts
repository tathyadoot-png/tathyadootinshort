import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import categoryRoutes from "./modules/category/category.routes";
import commentRoutes from "./modules/comment/comment.routes";
import engagementRoutes from "./modules/engagement/engagement.routes";
import newsRoutes from "./modules/news/news.routes";
import userRoutes from "./modules/user/user.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";

import { errorHandler } from "./middlewares/error.middleware"; 

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/categories", categoryRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/engagement", engagementRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* HEALTH CHECK */
app.get("/health", (_req, res) => {
  res.send("Backend Running 🚀");
});

/* 404 HANDLER (IMPORTANT) */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* GLOBAL ERROR HANDLER (ALWAYS LAST) */
app.use(errorHandler);

export default app;
