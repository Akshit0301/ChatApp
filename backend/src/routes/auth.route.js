// backend/routes/auth.route.js
import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
  debugCookies,
} from "../controllers/auth.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

// for debugging cookies (no auth, optional)
router.get("/debug/cookies", debugCookies);

export default router;
