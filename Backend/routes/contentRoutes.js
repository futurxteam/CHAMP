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

import { protect, contributorOnly } from "../middleware/authMiddleware.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

// L2 / L3 contributors create and manage content
router.post("/create", protect, contributorOnly, upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "video", maxCount: 1 }
]), createContent);

router.get("/my-content", protect, contributorOnly, getMyContent);

router.put("/:id", protect, contributorOnly, upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "video", maxCount: 1 }
]), updateContent);

// L1 / authenticated users — view-only
router.get("/published", protect, getPublishedContent);
router.get("/saved", protect, getSavedContent);
router.get("/:id", protect, getContent);
router.post("/:id/like", protect, toggleLikeContent);
router.post("/:id/save", protect, toggleSaveContent);

export default router;