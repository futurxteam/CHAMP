import MEDICAL_DOMAINS from "../models/domains.js";

// ─── GET /api/domains ─────────────────────────────────────────────────────────
// Returns the centralized medical domain list used across all platform features.
// No auth required — needed for public-facing forms and filtering.
export const getDomains = (req, res) => {
  res.json(MEDICAL_DOMAINS);
};
