import { Request, Response } from "express";
import * as reactionService from "./reaction.service";

export const toggleReaction = async (
  req: any,
  res: Response
) => {
  try {
    const { newsId, type } = req.body;

    const result =
      await reactionService.toggleReaction(
        req.user.id,
        newsId,
        type
      );

    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Reaction failed",
      error,
    });
  }
};
