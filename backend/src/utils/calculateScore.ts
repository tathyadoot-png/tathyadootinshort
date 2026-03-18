export const calculateScore = (news: any) => {
  const weights = {
    view: 1,
    like: 5,
    bookmark: 8,
    comment: 10,
    share: 12,
  };

  const rawScore =
    news.views * weights.view +
    news.likes * weights.like +
    news.bookmarks * weights.bookmark +
    news.commentsCount * weights.comment +
    news.shares * weights.share;

  const hoursSincePublish =
    (Date.now() -
      new Date(news.publishedAt || news.createdAt).getTime()) /
    (1000 * 60 * 60);

  return rawScore / (hoursSincePublish + 2);
};
