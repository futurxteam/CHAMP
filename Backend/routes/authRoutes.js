import express from "express";
import { signupUser, loginUser } from "../controllers/authController.js";
import { uploadProof } from "../utils/cloudinary.js";

const router = express.Router();

// Single unified signup endpoint with optional file upload for proof
router.post("/signup", uploadProof.single("proof"), signupUser);

// Login
router.post("/login", loginUser);

export default router;