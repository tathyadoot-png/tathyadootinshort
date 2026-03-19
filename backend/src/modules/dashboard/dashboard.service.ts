import News from "../news/news.model";
import Category from "../category/category.model";
import User from "../user/user.model";

export const getDashboardStats = async () => {
  const [
    totalNews,
    publishedNews,
    totalCategories,
    totalUsers,
  ] = await Promise.all([
    News.countDocuments({ isDeleted: false }),
    News.countDocuments({
      status: "published",
      isDeleted: false,
    }),
    Category.countDocuments(),
    User.countDocuments(),
  ]);

  return {
    totalNews,
    publishedNews,
    totalCategories,
    totalUsers,
  };
};