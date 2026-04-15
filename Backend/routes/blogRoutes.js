import express from "express";
import { getBlogs, getBlogById, createBlog } from "../controllers/blogController.js";
import { optionalAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", optionalAuth, getBlogs);
router.get("/:id", optionalAuth, getBlogById);
router.post("/", protect, createBlog); // Only authenticated can create

export default router;
