import Category from "./category.model";
import cloudinary from "../../config/cloudinary";
import { Express } from "express";

/**
 * Create Category
 */
export const createCategory = async (
  data: any,
  file?: Express.Multer.File
) => {
  if (file) {
    data.icon = {
      url: file.path,
      publicId: file.filename,
    };
  }

  return await Category.create(data);
};

/**
 * Get All Categories
 */
export const getAllCategories = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
  status?: string,
  sort: string = "createdAt",
  order: "asc" | "desc" = "desc"
) => {
  const skip = (page - 1) * limit;

  const filter: any = {};

  // 🔍 Search
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  // 📊 Status filter
  if (status !== undefined && status !== "") {
    filter.isActive = status === "true";
  }

  const sortOption: any = {
    [sort]: order === "asc" ? 1 : -1,
  };

  const [data, total] = await Promise.all([
    Category.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit),

    Category.countDocuments(filter),
  ]);

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data,
  };
};

/**
 * Get Active Categories
 */
export const getActiveCategories = async () => {
  return await Category.find({ isActive: true }).sort({ order: 1 });
};

/**
 * Update Category
 */
export const updateCategory = async (
  id: string,
  data: any,
  file?: Express.Multer.File
) => {
  const category = await Category.findById(id);
  if (!category) return null;

  if (file) {
    // delete old icon if exists
    if (category.icon?.publicId) {
      await cloudinary.uploader.destroy(category.icon.publicId);
    }

    data.icon = {
      url: file.path,
      publicId: file.filename,
    };
  }

  Object.assign(category, data);
  await category.save();

  return category;
};

/**
 * Delete Category
 */
export const deleteCategory = async (id: string) => {
  const category = await Category.findById(id);
  if (!category) return null;

  // delete icon from cloudinary if exists
  if (category.icon?.publicId) {
    await cloudinary.uploader.destroy(category.icon.publicId);
  }

  await category.deleteOne();
  return category;
};

/**
 * Get Category By ID
 */
export const getCategoryById = async (id: string) => {
  return await Category.findById(id);
};

export const getCategoryCount = async () => {
  return await Category.countDocuments();
};
