import mongoose from "mongoose";

const structuredSchema = new mongoose.Schema(
  {
    who: { type: String, trim: true },
    what: { type: String, trim: true },
    when: { type: String, trim: true },
    where: { type: String, trim: true },
    why: { type: String, trim: true },
    how: { type: String, trim: true },
  },
  { _id: false }
);

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    slug: { type: String, required: true, unique: true, index: true },

    imageUrl: {
      url: { type: String },
      publicId: { type: String },
    },


    excerpt: String,

    structured: structuredSchema,

    detailedContent: { type: String, required: true },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },


    tags: { type: [String], default: [] },

    location: String,

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },

    isBreaking: { type: Boolean, default: false },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    publishedAt: Date,

    metaTitle: String,
    metaDescription: String,
    keywords: { type: [String], default: [] },

    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    bookmarks: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    engagementScore: { type: Number, default: 0 },
  },

  { timestamps: true }
);

// Indexes
newsSchema.index({ status: 1 });
newsSchema.index({ categoryId: 1 });
newsSchema.index({ createdAt: -1 });
newsSchema.index({ engagementScore: -1 });
newsSchema.index({
  title: "text",
  detailedContent: "text",
  tags: "text",
});


export default mongoose.model("News", newsSchema);
