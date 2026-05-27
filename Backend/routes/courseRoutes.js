import express from "express";
import {
    createCourse,
    getMyCourses,
    getAllCourses,
    getCourseById,
    updateCourse,
    updateCourseBasicInfo,
    submitCourseForReview,
    approveCourse,
    rejectCourse
} from "../controllers/courseController.js";
import { protect, contributorOnly, adminOnly } from "../middleware/authMiddleware.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/create", protect, contributorOnly, upload.single("thumbnail"), createCourse);
router.get("/my", protect, contributorOnly, getMyCourses);
router.get("/", protect, getAllCourses);
router.get("/:id", protect, getCourseById);
router.put("/:id", protect, upload.single("thumbnail"), updateCourse);
router.put("/:id/basic-info", protect, contributorOnly, upload.single("thumbnail"), updateCourseBasicInfo);
router.put("/:id/submit", protect, contributorOnly, submitCourseForReview);
router.put("/:id/approve", protect, adminOnly, approveCourse);
router.put("/:id/reject", protect, adminOnly, rejectCourse);

export default router;
