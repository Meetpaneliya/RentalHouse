import express from "express";
import {
  createApplication,
  getKYCStatus,
  verifyKYC,
} from "../controllers/kycController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/application", protect, createApplication);
router.get("/", protect, getKYCStatus);
router.put("/verify", protect, verifyKYC);

export default router;
