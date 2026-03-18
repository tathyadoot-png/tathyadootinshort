import { Router } from "express";
import * as commentController from "./comment.controller.js";

const router = Router();

router.post("/", commentController.createComment);
router.get("/news/:newsId", commentController.getCommentsByNews);
router.delete("/:id", commentController.deleteComment);

router.patch("/:id/approve", commentController.approveComment);
router.patch("/:id/reject", commentController.rejectComment);

export default router;
