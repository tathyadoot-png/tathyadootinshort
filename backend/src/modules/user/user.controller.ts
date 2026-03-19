import { Request, Response } from "express";
import * as userService from "./user.service";
import { asyncHandler } from "../../middlewares/asyncHandler";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.registerUser(req.body);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    return res.json(result);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await userService.getUserById(
      req.params.id
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching user",
      error,
    });
  }
};

export const getProfile = async (req: any, res: Response) => {
  const user = await userService.getProfile(req.user.id);
  return res.json(user);
};

export const createEditor = async (req: Request, res: Response) => {
  try {
    // 🔥 FIX HERE
    if (req.body.permissions) {
      req.body.permissions = JSON.parse(req.body.permissions);
    }

    const user = await userService.createEditor(
      req.body,
      req.file
    );

    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 * Update User
 */
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    if (req.body.permissions) {
      req.body.permissions = JSON.parse(req.body.permissions);
    }

    const user = await userService.updateUser(
      req.params.id,
      req.body,
      req.file
    );

    if (!user)
      return res.status(404).json({ message: "User not found" });

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Error updating user",
      error,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      sort,
      order,
    } = req.query;

    const result = await userService.getAllUsers(
      Number(page),
      Number(limit),
      search as string,
      status as string,
      sort as string,
      order as "asc" | "desc"
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { role } = req.body;
  const user = await userService.updateUserRole(id, role);
  return res.json(user);
};

export const updatePermissions = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { permissions } = req.body;
  const user = await userService.updateUserPermissions(id, permissions);
  return res.json(user);
};


export const savePreferences = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;
    const { categories } = req.body;

    if (!Array.isArray(categories)) {
      return res.status(400).json({
        message: "Categories must be an array",
      });
    }

    const user =
      await userService.saveUserPreferences(
        userId,
        categories
      );

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Error saving preferences",
      error,
    });
  }
};


export const refreshToken = async (
  req: Request,
  res: Response
) => {
  const { refreshToken } = req.body;

  const result =
    await userService.refreshAccessToken(refreshToken);

  return res.json(result);
};

export const logout = async (req: any, res: Response) => {
  await userService.logoutUser(req.user.id);
  return res.json({ message: "Logged out successfully" });
};

export const getUserCount = asyncHandler(
  async (_req, res) => {
    const count = await userService.getUserCount();
    res.json({ total: count });
  }
);


export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await userService.deleteUser(
    req.params.id
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json({ message: "User deleted" });
};

export const toggleUserStatus = async (req: any, res: Response) => {
  try {
    const { isActive } = req.body;

    const user = await userService.toggleUserStatus(
      req.params.id,
      isActive
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};