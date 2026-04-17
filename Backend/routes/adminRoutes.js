import express from "express";
import {
  getPendingSpeakers,
  approveSpeaker,
  rejectSpeaker,
  getAllUsers,
  updateUserStatus,
    getPendingContent,
    approveContent,
    rejectContent
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/speakers/pending", protect, adminOnly, getPendingSpeakers);
router.put("/speakers/:id/approve", protect, adminOnly, approveSpeaker);
router.put("/speakers/:id/reject", protect, adminOnly, rejectSpeaker);

// 🔥 Comprehensive User Management
router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:id/status", protect, adminOnly, updateUserStatus);

router.get("/content/pending", protect, adminOnly, getPendingContent);
router.put("/content/:id/approve", protect, adminOnly, approveContent);
router.put("/content/:id/reject", protect, adminOnly, rejectContent);

export default router;