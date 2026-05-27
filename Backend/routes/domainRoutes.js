import express from "express";
import { getDomains } from "../controllers/domainController.js";

const router = express.Router();

// GET /api/domains — public, no auth required
router.get("/", getDomains);

export default router;
