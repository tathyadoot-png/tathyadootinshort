import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI not defined in .env");
    }

    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:");
    console.error(error);
    process.exit(1); // Exit if DB fails
  }
};

export default connectDB;
