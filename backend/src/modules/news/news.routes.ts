import { Router } from "express";
import * as newsController from "./news.controller";
import { upload } from "../../middlewares/upload.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requirePermission } from "../../middlewares/permission.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  requirePermission("news.create"),
  upload.single("image"),
  newsController.createNews
);

router.get("/admin", authMiddleware, newsController.getAllNews);
router.get("/", newsController.getPublishedNews);

router.get("/id/:id", newsController.getNewsById);

router.get("/:slug", newsController.getNewsBySlug);

router.put(
  "/:id",
  authMiddleware,
  requirePermission("news.edit"),
  upload.single("image"),
  newsController.updateNews
);

router.delete(
  "/:id",
  authMiddleware,
  requirePermission("news.delete"),
  newsController.deleteNews
);

router.get(
  "/personalized",
  authMiddleware,
  newsController.getPersonalizedFeed
);

router.get("/search", newsController.searchNews);

router.get(
  "/count",
  authMiddleware,
  newsController.getNewsCount
);

router.patch("/:id/status", newsController.toggleNewsStatus);



export default router;
