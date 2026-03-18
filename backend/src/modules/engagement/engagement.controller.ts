

import { Request, Response } from "express";
import * as engagementService from "./engagement.service";

export const toggleLike = async (req: any, res: Response) => {
  const newsId = req.params.newsId;
  const userId = req.user.id;

  const result = await engagementService.toggleLike(newsId, userId);
  return res.json(result);
};

export const toggleBookmark = async (req: any, res: Response) => {
  const newsId = req.params.newsId;
  const userId = req.user.id;

  const result = await engagementService.toggleBookmark(newsId, userId);
  return res.json(result);
};

export const shareNews = async (
  req: Request<{ newsId: string }>,
  res: Response
) => {
  const { newsId } = req.params;

  const result = await engagementService.incrementShare(newsId);

  return res.json(result);
};

export const getTrending = async (_req: Request, res: Response) => {
  const news = await engagementService.getTrendingNews();
  return res.json(news);
};
