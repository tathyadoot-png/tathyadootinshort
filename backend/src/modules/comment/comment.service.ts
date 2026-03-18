import Comment from "./comment.model.js";
import News from "../news/news.model.js";

/**
 * Create comment (default: pending)
 */
export const createComment = async (data: {
  newsId: string;
  userId: string;
  content: string;
}) => {
  const comment = await Comment.create({
    newsId: data.newsId,
    userId: data.userId,
    content: data.content,
    status: "pending", // always pending first
  });

  return comment;
};

/**
 * Get approved comments for a news
 */
export const getCommentsByNews = async (newsId: string) => {
  return await Comment.find({
    newsId,
    status: "approved",
  })
    .sort({ createdAt: -1 })
    .populate("userId", "name"); // show commenter name
};

/**
 * Delete comment (admin)
 * If approved → decrease commentsCount
 */
export const deleteComment = async (id: string) => {
  const comment = await Comment.findById(id);

  if (!comment) return null;

  if (comment.status === "approved") {
    await News.findByIdAndUpdate(comment.newsId, {
      $inc: { commentsCount: -1 },
    });
  }

  await Comment.findByIdAndDelete(id);

  return true;
};

/**
 * Approve comment (admin)
 * Increase commentsCount only when approving
 */
export const approveComment = async (id: string) => {
  const comment = await Comment.findById(id);

  if (!comment) return null;

  if (comment.status !== "approved") {
    comment.status = "approved";
    await comment.save();

    await News.findByIdAndUpdate(comment.newsId, {
      $inc: { commentsCount: 1 },
    });
  }

  return comment;
};

/**
 * Reject comment (admin)
 */
export const rejectComment = async (id: string) => {
  const comment = await Comment.findByIdAndUpdate(
    id,
    { status: "rejected" },
    { new: true }
  );

  return comment;
};
