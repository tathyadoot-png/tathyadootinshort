import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    description: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
      index: true,
    },
    icon: {
      url: { type: String },
      publicId: { type: String },
    },

  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
