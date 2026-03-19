// console.log("User routes loaded");
import { Router } from "express";
import * as userController from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requirePermission } from "../../middlewares/permission.middleware";
import { upload } from "../../middlewares/upload.middleware";

const router = Router();




// Public
router.post("/register", userController.register);
router.post("/login", userController.login);

// Logged-in user
router.get("/profile", authMiddleware, userController.getProfile);

// Admin Controls
router.post(
  "/create-editor",
  authMiddleware,
  requirePermission("user.managePermissions"),
  upload.single("image"), 
  userController.createEditor
);

router.get(
  "/count",
  authMiddleware,
  userController.getUserCount
)

router.get(
  "/:id",
  authMiddleware,
  requirePermission("user.managePermissions"),
  userController.getUserById
);

router.get(
  "/",
  authMiddleware,
  requirePermission("user.managePermissions"),
  userController.getAllUsers
);

router.patch(
  "/:id/role",
  authMiddleware,
  requirePermission("user.changeRole"),
  userController.updateRole
);

router.patch(
  "/:id/permissions",
  authMiddleware,
  requirePermission("user.managePermissions"),
  userController.updatePermissions
);

router.patch(
  "/:id",
  authMiddleware,
  requirePermission("user.managePermissions"),
  upload.single("image"), 
  userController.updateUser
);

router.post(
  "/preferences",
  authMiddleware,
  userController.savePreferences
);

router.post("/refresh", userController.refreshToken);

router.post(
  "/logout",
  authMiddleware,
  userController.logout
);

router.delete(
  "/:id",
  authMiddleware,
  requirePermission("user.managePermissions"),
  userController.deleteUser
);

router.patch("/:id/status", userController.toggleUserStatus);

export default router;
