import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("Attempting to connect to MongoDB...");
console.log(`URI: ${process.env.MONGODB_URI ? "Found" : "NOT FOUND"}`);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Connection failed:");
    console.error(err.message);
    process.exit(1);
  });
