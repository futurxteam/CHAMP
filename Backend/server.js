import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Load routes
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Main entry point
app.get("/", (req, res) => {
  res.send("API is running...");
});

// App Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/users", userRoutes);

// Database connection
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  });
