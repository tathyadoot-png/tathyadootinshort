import { Request, Response } from "express";
import * as commentService from "./comment.service";
import { asyncHandler } from "../../middlewares/asyncHandler";

/**
 * Create Comment
 */
export const createComment = asyncHandler(
  async (req: Request, res: Response) => {
    const comment =
      await commentService.createComment(
        req.body
      );

    res.status(201).json(comment);
  }
);

/**
 * Get Comments By News ID
 */
export const getCommentsByNews = asyncHandler(
  async (
    req: Request<{ newsId: string }>,
    res: Response
  ) => {
    const comments =
      await commentService.getCommentsByNews(
        req.params.newsId
      );

    res.json(comments);
  }
);

/**
 * Delete Comment
 */
export const deleteComment = asyncHandler(
  async (
    req: Request<{ id: string }>,
    res: Response
  ) => {
    const comment =
      await commentService.deleteComment(
        req.params.id
      );

    if (!comment) {
      const error: any = new Error(
        "Comment not found"
      );
      error.statusCode = 404;
      throw error;
    }

    res.json({
      message: "Comment deleted successfully",
    });
  }
);

/**
 * Approve Comment (Admin)
 */
export const approveComment = asyncHandler(
  async (
    req: Request<{ id: string }>,
    res: Response
  ) => {
    const comment =
      await commentService.approveComment(
        req.params.id
      );

    if (!comment) {
      const error: any = new Error(
        "Comment not found"
      );
      error.statusCode = 404;
      throw error;
    }

    res.json(comment);
  }
);

/**
 * Reject Comment (Admin)
 */
export const rejectComment = asyncHandler(
  async (
    req: Request<{ id: string }>,
    res: Response
  ) => {
    const comment =
      await commentService.rejectComment(
        req.params.id
      );

    if (!comment) {
      const error: any = new Error(
        "Comment not found"
      );
      error.statusCode = 404;
      throw error;
    }

    res.json(comment);
  }
);
