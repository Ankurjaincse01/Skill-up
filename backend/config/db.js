const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/interview-prep");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    console.warn("⚠️ Backend is running, but database features will not work until MongoDB Atlas is resumed.");
    // Temporarily disabled so the backend stops crashing for you:
    // process.exit(1);
  }
};

module.exports = connectDB;
