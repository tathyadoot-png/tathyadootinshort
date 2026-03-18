import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    newsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

bookmarkSchema.index({ newsId: 1, userId: 1 }, { unique: true });

export default mongoose.model("Bookmark", bookmarkSchema);
