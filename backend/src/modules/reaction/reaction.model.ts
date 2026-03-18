import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    newsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["like", "bookmark"],
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate reaction
reactionSchema.index(
  { userId: 1, newsId: 1, type: 1 },
  { unique: true }
);

export default mongoose.model(
  "Reaction",
  reactionSchema
);
