import { Router } from "express";
import * as categoryController from "./category.controller";
import { upload } from "../../middlewares/upload.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requirePermission } from "../../middlewares/permission.middleware";

const router = Router();

router.post(
  "/",
  upload.single("icon"),
  categoryController.createCategory
);

router.get("/", categoryController.getCategories);
router.get("/active", categoryController.getActiveCategories);

router.get("/:id", categoryController.getCategoryById);

router.put(
  "/:id",
  upload.single("icon"),
  categoryController.updateCategory
);

router.delete("/:id", categoryController.deleteCategory);

router.get(
  "/count",
  authMiddleware,
  categoryController.getCategoryCount
);


export default router;
