import { Router } from "express";
import * as engagementController from "./engagement.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/:newsId/like", authMiddleware, engagementController.toggleLike);
router.post("/:newsId/bookmark", authMiddleware, engagementController.toggleBookmark);
router.post("/:newsId/share", engagementController.shareNews);

router.get("/trending", engagementController.getTrending);

export default router;
