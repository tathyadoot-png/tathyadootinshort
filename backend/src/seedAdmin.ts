import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./modules/user/user.model";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;

const seedAdmin = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB Connected ✅");

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const newAdmin = await User.create({
    name: "Admin " + Date.now(),
    email: `admin${Date.now()}@gmail.com`,
    password: hashedPassword,
    role: "ADMIN",
  });

  console.log("New Admin Created ✅");
  console.log("Email:", newAdmin.email);
  console.log("Password: admin123");

  process.exit();
};

seedAdmin();
