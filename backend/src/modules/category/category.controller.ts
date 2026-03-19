import { Request, Response } from "express";
import * as categoryService from "./category.service";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { getAllCategories } from "./category.service";


interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

/**
 * Create Category
 */
export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await categoryService.createCategory(
      req.body,
      req.file
    );

    res.status(201).json(category);
  }
);

/**
 * Get All Categories
 */
export const getCategories = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      sort,
      order,
    } = req.query;

    const result = await getAllCategories(
      Number(page),
      Number(limit),
      search as string,
      status as string,
      sort as string,
      order as "asc" | "desc"
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
};
/**
 * Get Active Categories
 */
export const getActiveCategories = asyncHandler(
  async (_req: Request, res: Response) => {
    const categories =
      await categoryService.getActiveCategories();

    res.json(categories);
  }
);

/**
 * Get Category By ID
 */
export const getCategoryById = asyncHandler<{ id: string }>(
  async (req, res) => {
    const category = await categoryService.getCategoryById(
      req.params.id
    );

    if (!category) {
      const error: any = new Error("Category not found");
      error.statusCode = 404;
      throw error;
    }

    res.json(category);
  }
);


/**
 * Update Category
 */
export const updateCategory = asyncHandler<{ id: string }>(
  async (req, res) => {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body,
      req.file
    );

    if (!category) {
      const error: any = new Error("Category not found");
      error.statusCode = 404;
      throw error;
    }

    res.json(category);
  }
);

/**
 * Delete Category
 */
export const deleteCategory = asyncHandler(
  async (
    req: Request<{ id: string }>,
    res: Response
  ) => {
    const category =
      await categoryService.deleteCategory(
        req.params.id
      );

    if (!category) {
      const error: any = new Error(
        "Category not found"
      );
      error.statusCode = 404;
      throw error;
    }

    res.json({
      message: "Category deleted successfully",
    });
  }
);

export const getCategoryCount = asyncHandler(
  async (_req, res) => {
    const count = await categoryService.getCategoryCount();
    res.json({ total: count });
  }
);


export const toggleCategoryStatus = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { isActive } = req.body;

    const category =
      await categoryService.toggleCategoryStatus(
        req.params.id,
        isActive
      );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error updating category",
    });
  }
};