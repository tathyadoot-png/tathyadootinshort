import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./user.model";
import cloudinary from "../../config/cloudinary";
import { Express } from "express";
import dotenv from "dotenv";
dotenv.config();

/**
 * Public Register (Always USER)
 */
export const registerUser = async (data: any) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: "USER",
  });

  return user;
};

/**
 * Admin Create Editor (with avatar)
 */
export const createEditor = async (
  data: any,
  file?: Express.Multer.File
) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUserData: any = {
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: "EDITOR",
    permissions: data.permissions || {},
  };

  if (file) {
    newUserData.avatarUrl = {
      url: file.path,
      publicId: file.filename,
    };
  }

  return await User.create(newUserData);
};

/**
 * Update User
 */
export const updateUser = async (
  id: string,
  data: any,
  file?: Express.Multer.File
) => {
  const user = await User.findById(id);0.
  
  if (!user) return null;

  delete data.password;

  if (file) {
    // delete old avatar
    if (user.avatarUrl?.publicId) {
      await cloudinary.uploader.destroy(
        user.avatarUrl.publicId
      );
    }

    data.avatarUrl = {
      url: file.path,
      publicId: file.filename,
    };
  }

  Object.assign(user, data);
  await user.save();

  return user;
};


/**
 * Login
 */
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret_key";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret_key";

console.log("ACCESS_SECRET:", process.env.JWT_ACCESS_SECRET);
console.log("REFRESH_SECRET:", process.env.JWT_REFRESH_SECRET);

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("Invalid credentials");

  // 🔥 Plain password comparison (ONLY for testing)
  if (user.password !== password) {
    throw new Error("Invalid credentials");
  }

  user.lastLogin = new Date();
  await user.save();

  const accessToken = jwt.sign(
    {
      id: user._id,
      role: user.role,
      permissions: user.permissions,
    },
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken,
  };
};


// export const loginUser = async (
//   email: string,
//   password: string
// ) => {
//   const user = await User.findOne({ email }).select("+password");
//   if (!user) throw new Error("Invalid credentials");

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) throw new Error("Invalid credentials");

//   user.lastLogin = new Date();
//   await user.save();

//   const accessToken = jwt.sign(
//     {
//       id: user._id,
//       role: user.role,
//       permissions: user.permissions,
//     },
//     ACCESS_SECRET,
//     { expiresIn: "15m" }
//   );

//   const refreshToken = jwt.sign(
//     { id: user._id },
//     REFRESH_SECRET,
//     { expiresIn: "7d" }
//   );

//   user.refreshToken = refreshToken;
//   await user.save();

//   return {
//     accessToken,
//     refreshToken,
//   };
// };

export const refreshAccessToken = async (
  token: string
) => {
  if (!token) throw new Error("No refresh token");

  const decoded: any = jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET!
  );

  const user = await User.findById(decoded.id).select("+refreshToken");

  if (!user || user.refreshToken !== token)
    throw new Error("Invalid refresh token");

  const newAccessToken = jwt.sign(
    {
      id: user._id,
      role: user.role,
      permissions: user.permissions,
    },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: "15m" }
  );

  return { accessToken: newAccessToken };
};

export const logoutUser = async (userId: string) => {
  await User.findByIdAndUpdate(userId, {
    refreshToken: null,
  });
};


export const getProfile = async (userId: string) => {
  return await User.findById(userId).select("-password");
};

export const getAllUsers = async () => {
  return await User.find().select("-password");
};

export const updateUserRole = async (id: string, role: string) => {
  return await User.findByIdAndUpdate(id, { role }, { new: true });
};

export const updateUserPermissions = async (
  userId: string,
  permissions: any
) => {
  return await User.findByIdAndUpdate(
    userId,
    { permissions },
    { new: true }
  ).select("-password");
};

/**
 * Save User Preferred Categories
 */
export const saveUserPreferences = async (
  userId: string,
  categories: string[]
) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      preferredCategories: categories,
    },
    { new: true }
  ).populate("preferredCategories", "name slug");

  return user;
};

export const getUserCount = async () => {
  return await User.countDocuments();
};



