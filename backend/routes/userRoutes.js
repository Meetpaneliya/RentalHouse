import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  logoutUser,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.get("/me", protect, getMe);
router.put("/update", protect, updateUser);
router.delete("/delete", protect, deleteUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
