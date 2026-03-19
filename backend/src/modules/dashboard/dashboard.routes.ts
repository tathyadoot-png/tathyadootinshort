import express from "express";
import { getDashboardStats } from "./dashboard.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = express.Router();

router.get("/stats", authMiddleware, getDashboardStats);

export default router;