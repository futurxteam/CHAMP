import express from "express";
import {
    createLesson,
    getLessonsByModule,
    updateLesson,
    deleteLesson
} from "../controllers/courseController.js";
import { protect, contributorOnly } from "../middleware/authMiddleware.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/create", protect, contributorOnly, upload.single("video"), createLesson);
router.get("/module/:moduleId", protect, getLessonsByModule);
router.put("/:id", protect, contributorOnly, upload.single("video"), updateLesson);
router.delete("/:id", protect, contributorOnly, deleteLesson);

export default router;
