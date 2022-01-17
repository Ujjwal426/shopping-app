import express from "express";
import {
  authController,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../Controllers/usersController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);

router.get("/profile", protect, getUserProfile);
router.post("/profile", protect, updateUserProfile);

router.post("/login", authController);

export default router;
