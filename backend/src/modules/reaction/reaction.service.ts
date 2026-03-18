import Reaction from "./reaction.model";
import News from "../news/news.model";

export const toggleReaction = async (
  userId: string,
  newsId: string,
  type: "like" | "bookmark"
) => {
  const existing = await Reaction.findOne({
    userId,
    newsId,
    type,
  });

  // 🔴 If exists → remove
  if (existing) {
    await existing.deleteOne();

    await News.updateOne(
      { _id: newsId },
      { $inc: { [type + "s"]: -1 } }
    );

    return { removed: true };
  }

  // 🟢 If not → create
  await Reaction.create({
    userId,
    newsId,
    type,
  });

  await News.updateOne(
    { _id: newsId },
    { $inc: { [type + "s"]: 1 } }
  );

  return { added: true };
};
