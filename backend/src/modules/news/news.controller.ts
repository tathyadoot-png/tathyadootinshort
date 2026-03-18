import { Request, Response } from "express";
import * as newsService from "./news.service";
import * as engagementService from "../engagement/engagement.service";
import { asyncHandler } from "../../middlewares/asyncHandler";

/**
 * Create News
 */
export const createNews = async (
  req: Request,
  res: Response
) => {
  try {
    const news = await newsService.createNews(
      req.body,
      req.file
    );

    return res.status(201).json(news);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating news",
      error,
    });
  }
};

/**
 * Get All Published News (Pagination)
 */
export const getPublishedNews = async (
  req: Request,
  res: Response
) => {
  try {
    const page =
      parseInt(req.query.page as string) || 1;

    const limit =
      parseInt(req.query.limit as string) || 10;

    const news =
      await newsService.getPublishedNews(
        page,
        limit
      );

    return res.json(news);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching news",
      error,
    });
  }
};

/**
 * Get News By Slug
 */
export const getNewsBySlug = async (
  req: Request<{ slug: string }>,
  res: Response
) => {
  try {
    const { slug } = req.params;

    const news =
      await newsService.getNewsBySlug(slug);

    if (!news)
      return res.status(404).json({
        message: "News not found",
      });

    const ip =
      req.headers["x-forwarded-for"]?.toString() ||
      req.socket.remoteAddress ||
      req.ip ||
      "unknown";

    await engagementService.incrementView(slug, ip);

    return res.json(news);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching news",
      error,
    });
  }
};



/**
 * Update News
 */
export const updateNews = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const news =
      await newsService.updateNews(
        req.params.id,
        req.body,
        req.file
      );

    if (!news)
      return res.status(404).json({
        message: "News not found",
      });

    return res.json(news);
  } catch (error) {
    return res.status(500).json({
      message: "Error updating news",
      error,
    });
  }
};

/**
 * Soft Delete News
 */
export const deleteNews = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const news =
      await newsService.deleteNews(
        req.params.id
      );

    if (!news)
      return res.status(404).json({
        message: "News not found",
      });

    return res.json({
      message: "News deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting news",
      error,
    });
  }
};

/**
 * Get News By ID (Admin)
 */
export const getNewsById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const news =
      await newsService.getNewsById(
        req.params.id
      );

    if (!news)
      return res.status(404).json({
        message: "News not found",
      });

    return res.json(news);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching news",
      error,
    });
  }
};


export const getPersonalizedFeed = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const news =
      await newsService.getPersonalizedFeed(
        userId,
        page,
        limit
      );

    return res.json(news);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching personalized feed",
      error,
    });
  }
};

export const searchNews = async (
  req: Request,
  res: Response
) => {
  try {
    const query = req.query.q as string;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (!query)
      return res
        .status(400)
        .json({ message: "Search query required" });

    const result = await newsService.searchNews(
      query,
      page,
      limit
    );

    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Error searching news",
      error,
    });
  }
};

export const getNewsCount = asyncHandler(
  async (_req: Request, res: Response) => {
    const count = await newsService.getNewsCount();
    res.json({ total: count });
  }
);
