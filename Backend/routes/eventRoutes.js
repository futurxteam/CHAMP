import express from "express";
import { getEvents, getEventById, createEvent } from "../controllers/eventController.js";
import { optionalAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", optionalAuth, getEvents);
router.get("/:id", optionalAuth, getEventById);
router.post("/", protect, createEvent);

export default router;
