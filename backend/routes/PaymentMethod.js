// paymentRoutes.js
import express from "express";

import { protect } from "../middlewares/auth.js";
import { createStripePayment } from "../controllers/PaymentMeothod.js";

const router = express.Router();

// Create Payment Intent - Protected route so only authenticated users can pay
router.post("/stripe", protect, createStripePayment);

export default router;
