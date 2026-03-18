import { Router } from "express";
import * as reactionController from "./reaction.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requirePermission } from "../../middlewares/permission.middleware";

const router = Router();

router.post(
  "/toggle",
  authMiddleware,
  reactionController.toggleReaction
);

export default router;
