import express from "express";
import {
  getCertifications,
  startTest,
  submitTest,
  getMyCertificates,
  verifyCertificate
} from "../controllers/testController.js";
import { protect, requireL1 } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET  /api/test/certifications  — list all available certifications (any authenticated user)
router.get("/certifications", protect, getCertifications);

// GET  /api/test/:certId/start   — start a test session (L1 only)
router.get("/:certId/start", protect, requireL1, startTest);

// POST /api/test/submit           — submit answers (L1 only)
router.post("/submit", protect, requireL1, submitTest);

// GET /api/test/my-certificates   — get all certificates for logged-in user
router.get("/my-certificates", protect, getMyCertificates);

// GET /api/test/certificate/:verificationId — Public verification
router.get("/certificate/:verificationId", verifyCertificate);

export default router;
