// paymentRoutes.js
import express from "express";

import { protect } from "../middlewares/auth.js";
import {
  createPayPalPayment,
  createRazorpayPayment,
  createStripePayment,
  verifyPaymentCancel,
  verifyPaymentSuccess,
} from "../controllers/PaymentMeothod.js";

const router = express.Router();

// Create Payment Intent - Protected route so only authenticated users can pay
router.post("/stripe", protect, createStripePayment);
router.post("/razorpay", protect, createRazorpayPayment);
router.post("/paypal", protect, createPayPalPayment);
router.get("paypal/success", protect, verifyPaymentSuccess);
router.get("paypal/cancel", protect, verifyPaymentCancel);

export default router;
