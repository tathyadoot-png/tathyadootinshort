import News from "./news.model";
import cloudinary from "../../config/cloudinary";
import redis from "../../config/redis";
import mongoose from "mongoose";
import User from "../user/user.model";
import { getTrendingNews } from "../engagement/engagement.service";

/**
 * Create News
 */
export const createNews = async (data: any, file?: Express.Multer.File) => {

  if (typeof data.structured === "string") {
    data.structured = JSON.parse(data.structured);
  }

  if (typeof data.tags === "string") {
    data.tags = JSON.parse(data.tags);
  }

  if (typeof data.keywords === "string") {
    data.keywords = JSON.parse(data.keywords);
  }

  if (data.publishedAt) {
    data.publishedAt = new Date(data.publishedAt);
  }

  if (file) {
    data.imageUrl = {
      url: file.path,
      publicId: file.filename,
    };
  }

  return await News.create(data);
};


export const getAllNews = async (
  page: number,
  limit: number,
  status?: string,
  search?: string
) => {
  const skip = (page - 1) * limit;

  const query: any = {
    isDeleted: false,
  };

  // ✅ status filter (optional)
  if (status) {
    query.status = status;
  }

  // ✅ search by title
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const [data, total] = await Promise.all([
    News.find(query)
      .populate("categoryId", "name slug")
      .populate("authorId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    News.countDocuments(query),
  ]);

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data,
  };
};


/**
 * Get All Published News (Pagination)
 */
export const getPublishedNews = async (
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    News.find({
      status: "published",
      isDeleted: false,
    })
      .populate("categoryId", "name slug")
      .populate("authorId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    News.countDocuments({
      status: "published",
      isDeleted: false,
    }),
  ]);

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data,
  };
};

/**
 * Get News By Slug
 */
export const getNewsBySlug = async (slug: string) => {
  return await News.findOne({
    slug,
    status: "published",
    isDeleted: false,
  })
    .populate("categoryId", "name slug")
    .populate("authorId", "name");
};

/**
 * Update News
 */
export const updateNews = async (
  id: string,
  data: any,
  file?: Express.Multer.File
) => {
  const news = await News.findById(id);
  if (!news) return null;

  // 🔥 ADD THIS (MOST IMPORTANT FIX)
  if (typeof data.structured === "string") {
    data.structured = JSON.parse(data.structured);
  }

  if (typeof data.tags === "string") {
    data.tags = JSON.parse(data.tags);
  }

  if (typeof data.keywords === "string") {
    data.keywords = JSON.parse(data.keywords);
  }

  if (data.publishedAt) {
    data.publishedAt = new Date(data.publishedAt);
  }

  // 🔥 image handling
  if (file) {
    if (news.imageUrl?.publicId) {
      await cloudinary.uploader.destroy(news.imageUrl.publicId);
    }

    data.imageUrl = {
      url: file.path,
      publicId: file.filename,
    };
  }

  Object.assign(news, data);
  await news.save();

  return news;
};

/**
 * Soft Delete News
 */
export const deleteNews = async (id: string) => {
  return await News.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

/**
 * Get News By ID (Admin Edit)
 */
export const getNewsById = async (id: string) => {
  return await News.findById(id)
    .populate("categoryId", "name slug")
    .populate("authorId", "name");
};


export const getSmartFeed = async (
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;

  return await News.aggregate([
    {
      $match: {
        status: "published",
        isDeleted: false,
      },
    },
    {
      $addFields: {
        priority: {
          $cond: [
            { $eq: ["$isBreaking", true] },
            3,
            {
              $cond: [
                { $gt: ["$engagementScore", 15] },
                2,
                1,
              ],
            },
          ],
        },
      },
    },
    {
      $sort: {
        priority: -1,
        engagementScore: -1,
        createdAt: -1,
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);
};

/**
 * Personalized Feed (Category Based)
 */
export const getPersonalizedFeed = async (
  userId: string,
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;

  const user = await User.findById(userId);

  if (!user) return [];

  // If no preferences → fallback to trending
  if (!user.preferredCategories.length) {
    return await getTrendingNews(limit);
  }

  return await News.find({
    status: "published",
    isDeleted: false,
    categoryId: { $in: user.preferredCategories },
  })
    .sort({
      engagementScore: -1,
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit)
    .populate("categoryId", "name slug")
    .populate("authorId", "name");
};

export const searchNews = async (
  query: string,
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    News.find({
      status: "published",
      isDeleted: false,
      $text: { $search: query },
    })
      .sort({ score: { $meta: "textScore" } })
      .skip(skip)
      .limit(limit)
      .populate("categoryId", "name slug")
      .populate("authorId", "name"),

    News.countDocuments({
      status: "published",
      isDeleted: false,
      $text: { $search: query },
    }),
  ]);

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data,
  };
};

export const getNewsCount = async () => {
  return await News.countDocuments({
    isDeleted: false,
  });
};


/**
 * Toggle News Status (Publish / Draft)
 */
export const toggleNewsStatus = async (
  id: string,
  status: "published" | "draft"
) => {
  const news = await News.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  return news;
};