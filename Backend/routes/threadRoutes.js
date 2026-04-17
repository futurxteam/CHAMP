import express from "express";
import { createThread, getThreads, toggleLikeThread } from "../controllers/threadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createThread);
router.get("/:contentId", protect, getThreads);
router.post("/:id/like", protect, toggleLikeThread);

export default router;
