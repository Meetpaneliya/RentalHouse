import Stripe from "stripe";
import { TryCatch } from "../middlewares/error.js";
import { configDotenv } from "dotenv";
configDotenv();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createStripePayment = TryCatch(async (req, res) => {
  const { amount, currency } = req.body; // amount in cents

  if (!amount) {
    return next(new ErrorHandler(400, "Amount is required"));
  }

  // Create a Payment Intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount, // amount should be in cents
    currency: currency || "usd",
    // You can add metadata or payment method types if needed
    payment_method_types: ["card"],
  });

  res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
});

export { createStripePayment };
