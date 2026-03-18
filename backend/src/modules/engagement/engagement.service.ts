import Like from "./like.model";
import Bookmark from "./bookmark.model";
import News from "../news/news.model";
import redis from "../../config/redis";
import { calculateScore } from "../../utils/calculateScore";

/**
 * Increment View (Unique per IP for 1 hour)
 */
export const incrementView = async (
  slug: string,
  ip: string
) => {
  const key = `view:${slug}:${ip}`;

  const alreadyViewed = await redis.get(key);
  if (alreadyViewed) return;

  await redis.set(key, "1", "EX", 3600);

  const news = await News.findOneAndUpdate(
    { slug, isDeleted: false },
    { $inc: { views: 1 } },
    { new: true }
  );

  if (news) {
    news.engagementScore = calculateScore(news);
    await news.save();
  }
};


/**
 * Toggle Like
 */
export const toggleLike = async (
  newsId: string,
  userId: string
) => {
  const existing = await Like.findOne({
    newsId,
    userId,
  });

  if (existing) {
    await Like.deleteOne({ _id: existing._id });

    await News.findByIdAndUpdate(newsId, {
      $inc: { likes: -1 },
    });

    return { liked: false };
  } else {
    await Like.create({ newsId, userId });

    await News.findByIdAndUpdate(newsId, {
      $inc: { likes: 1 },
    });

    const news = await News.findById(newsId);

    if (news) {
      news.engagementScore = calculateScore(news);
      await news.save();
    }

    return { liked: true };
  }
};


/**
 * Toggle Bookmark
 */
export const toggleBookmark = async (
  newsId: string,
  userId: string
) => {
  const existing = await Bookmark.findOne({
    newsId,
    userId,
  });

  if (existing) {
    await Bookmark.deleteOne({ _id: existing._id });

    await News.findByIdAndUpdate(newsId, {
      $inc: { bookmarks: -1 },
    });

    return { bookmarked: false };
  } else {
    await Bookmark.create({ newsId, userId });

    await News.findByIdAndUpdate(newsId, {
      $inc: { bookmarks: 1 },
    });

    return { bookmarked: true };
  }
};


/**
 * Increment Share
 */
export const incrementShare = async (
  newsId: string
) => {
  const news = await News.findByIdAndUpdate(
    newsId,
    { $inc: { shares: 1 } },
    { new: true }
  );

  if (news) {
    news.engagementScore = calculateScore(news);
    await news.save();
  }

  return news;
};


/**
 * Get Trending News
 */
export const getTrendingNews = async (
  limit: number = 10
) => {
  return await News.find({
    status: "published",
    isDeleted: false,
  })
    .sort({ engagementScore: -1 })
    .limit(limit)
    .populate("categoryId", "name slug")
    .populate("authorId", "name");
};
