import express from "express";
import { getUsers } from "../controllers/userController.js";
import { optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", optionalAuth, getUsers);

export default router;
