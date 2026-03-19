import News from "../news/news.model";
import Category from "../category/category.model";
import User from "../user/user.model";

export const getDashboardStats = async () => {
  const [
    totalNews,
    publishedNews,
    totalCategories,
    totalUsers,
    engagementStats,
  ] = await Promise.all([
    News.countDocuments({ isDeleted: false }),
    News.countDocuments({
      status: "published",
      isDeleted: false,
    }),
    Category.countDocuments(),
    User.countDocuments(),

    // 🔥 aggregation for engagement
    News.aggregate([
      {
        $group: {
          _id: null,
          totalLikes: { $sum: "$likes" },
          totalBookmarks: { $sum: "$bookmarks" },
          totalShares: { $sum: "$shares" },
          totalViews: { $sum: "$views" },
        },
      },
    ]),
  ]);

  const stats = engagementStats[0] || {};

  return {
    totalNews,
    publishedNews,
    totalCategories,
    totalUsers,

    totalLikes: stats.totalLikes || 0,
    totalBookmarks: stats.totalBookmarks || 0,
    totalShares: stats.totalShares || 0,
    totalViews: stats.totalViews || 0,
  };
};