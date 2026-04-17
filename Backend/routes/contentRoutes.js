import express from "express";
import {
  createContent,
  getPublishedContent,
  getMyContent,
  updateContent,
  toggleLikeContent,
  toggleSaveContent,
  getContent,
  getSavedContent,
} from "../controllers/contentController.js";

import { protect, speakerOnly } from "../middleware/authMiddleware.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

// 🎤 Speaker creates and manages content
router.post("/create", protect, speakerOnly, upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "video", maxCount: 1 }
]), createContent);

router.get("/my-content", protect, speakerOnly, getMyContent);

router.put("/:id", protect, speakerOnly, upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "video", maxCount: 1 }
]), updateContent);

// 🌍 Public content
router.get("/published", protect, getPublishedContent);
router.get("/saved", protect, getSavedContent);
router.get("/:id", protect, getContent);
router.post("/:id/like", protect, toggleLikeContent);
router.post("/:id/save", protect, toggleSaveContent);

export default router;