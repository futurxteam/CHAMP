import express from "express";
import { getEvents, registerForEvent, createEvent, updateEvent, deleteEvent, getEventById, getAdminEvents } from "../controllers/eventController.js";
import { optionalAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", optionalAuth, getEvents);
router.get("/admin/all", protect, getAdminEvents);
router.get("/:id", optionalAuth, getEventById);
router.post("/:id/register", protect, registerForEvent);
router.post("/", protect, createEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

export default router;
