import express from "express";
import { createComment, getComments, toggleLikeComment } from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createComment);
router.get("/:threadId", protect, getComments);
router.post("/:id/like", protect, toggleLikeComment);

export default router;
