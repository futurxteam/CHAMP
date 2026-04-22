import express from "express";
import { getEvents, registerForEvent, createEvent, updateEvent, deleteEvent, getEventById, getAdminEvents } from "../controllers/eventController.js";
import { optionalAuth, protect } from "../middleware/authMiddleware.js";

import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.get("/", optionalAuth, getEvents);
router.get("/admin/all", protect, getAdminEvents);
router.get("/:id", optionalAuth, getEventById);
router.post("/:id/register", protect, registerForEvent);

// Admin routes with Cloudinary upload support
router.post("/", protect, upload.single("thumbnail"), createEvent);
router.put("/:id", protect, upload.single("thumbnail"), updateEvent);
router.delete("/:id", protect, deleteEvent);

export default router;
