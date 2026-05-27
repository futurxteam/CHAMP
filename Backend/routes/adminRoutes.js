import express from "express";
import {
  getPendingContributors,
  approveContributor,
  rejectContributor,
  promoteContributor,
  getAllUsers,
  updateUserStatus,
  getPendingContent,
  getAllContent,
  approveContent,
  rejectContent,
  deleteContent,
  createCertification,
  addQuestion,
  getQuestionsByCert,
  deleteQuestion,
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// === Contributor Management ===
router.get("/contributors/pending", protect, adminOnly, getPendingContributors);
router.put("/contributors/:id/approve", protect, adminOnly, approveContributor);
router.put("/contributors/:id/reject", protect, adminOnly, rejectContributor);
router.put("/contributors/:id/promote", protect, adminOnly, promoteContributor);

// === User Management ===
router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:id/status", protect, adminOnly, updateUserStatus);

// === Content Management ===
router.get("/content/pending", protect, adminOnly, getPendingContent);
router.get("/content/all", protect, adminOnly, getAllContent);
router.put("/content/:id/approve", protect, adminOnly, approveContent);
router.put("/content/:id/reject", protect, adminOnly, rejectContent);
router.delete("/content/:id", protect, adminOnly, deleteContent);

// === Certification Management ===
router.post("/certification/create", protect, adminOnly, createCertification);
router.post("/certification/:certId/question", protect, adminOnly, addQuestion);
router.get("/certification/:certId/questions", protect, adminOnly, getQuestionsByCert);
router.delete("/question/:id", protect, adminOnly, deleteQuestion);

export default router;