import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token excluding password
      req.user = await User.findById(decoded.id).select("-password");
      
      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      return next();
    } catch (error) {
      console.error("Auth Middleware Error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

const optionalAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      // If token is invalid, proceed without a user
    }
  }
  next();
};

// Admin only
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "Admin access only" });
};

// L1 only — certified test-takers
export const requireL1 = (req, res, next) => {
  if (req.user && req.user.role === "L1") {
    return next();
  }
  res.status(403).json({ message: "L1 access only" });
};

// L2 or L3 — contributors who can create / update content
export const contributorOnly = (req, res, next) => {
  if (req.user && (req.user.role === "L2" || req.user.role === "L3")) {
    return next();
  }
  res.status(403).json({ message: "Contributor access only (L2 or L3 required)" });
};

export { protect, optionalAuth };
