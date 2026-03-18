import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
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

// Prevent duplicate like
likeSchema.index({ newsId: 1, userId: 1 }, { unique: true });

export default mongoose.model("Like", likeSchema);
