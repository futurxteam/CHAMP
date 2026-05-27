import express from "express";
import {
    createModule,
    getModulesByCourse,
    updateModule,
    deleteModule
} from "../controllers/courseController.js";
import { protect, contributorOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, contributorOnly, createModule);
router.get("/course/:courseId", protect, getModulesByCourse);
router.put("/:id", protect, contributorOnly, updateModule);
router.delete("/:id", protect, contributorOnly, deleteModule);

export default router;
