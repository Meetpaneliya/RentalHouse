import Stripe from "stripe";
import Razorpay from "razorpay";
import { TryCatch } from "../middlewares/error.js";
import { config } from "dotenv";
import paypal from "paypal-rest-sdk";
import ErrorHandler from "../utils/errorHandler.js";

config(); // Load environment variables

// Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZOR_ID,
  key_secret: process.env.RAZOR_SECRET,
});

// PayPal instance configuration
paypal.configure({
  mode: "sandbox", // sandbox or live
  client_id: process.env.PAYPAL_Client_ID,
  client_secret: process.env.PAYPAL_Secret_key,
});

// Create Stripe Payment Intent
const createStripePayment = TryCatch(async (req, res, next) => {
  const { amount, currency } = req.body; // amount in cents
  if (!amount) {
    return next(new ErrorHandler(400, "Amount is required"));
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount, // amount should be in cents
    currency: currency || "usd",
    payment_method_types: ["card"],
  });
  res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
});

// Create Razorpay Payment Order
const createRazorpayPayment = TryCatch(async (req, res, next) => {
  const { amount, currency, receipt } = req.body; // amount in rupees
  if (!amount) {
    return next(new ErrorHandler(400, "Amount is required"));
  }
  // Convert rupees to paisa
  const options = {
    amount: amount * 100,
    currency: currency || "INR",
    receipt: receipt || "receipt#1",
  };
  const payment = await razorpay.orders.create(options);
  res.status(200).json({
    success: true,
    payment,
  });
});

// Create PayPal Payment
const createPayPalPayment = TryCatch(async (req, res, next) => {
  const { amount, currency, description } = req.body; // amount in USD
  if (!amount) {
    return next(new ErrorHandler(400, "Amount is required"));
  }

  const paymentJson = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `${process.env.BASE_URL}/payment/paypal/success`,
      cancel_url: `${process.env.BASE_URL}/payment/paypal/cancel`,
    },
    transactions: [
      {
        amount: {
          currency: currency || "USD",
          total: amount.toString(),
        },
        description: description || "Payment description",
      },
    ],
  };

  paypal.payment.create(paymentJson, function (error, payment) {
    if (error) {
      console.error("PayPal Payment Creation Error:", error);
      return next(new ErrorHandler(500, error.response));
    } else {
      // Look for the approval URL in the payment links array
      let approvalUrl = "";
      payment.links.forEach((link) => {
        if (link.rel === "approval_url") {
          approvalUrl = link.href;
        }
      });
      if (approvalUrl) {
        return res.status(200).json({
          success: true,
          approvalUrl,
        });
      } else {
        return next(
          new ErrorHandler(500, "Approval URL not found in PayPal response")
        );
      }
    }
  });
});

const verifyPaymentSuccess = TryCatch(async (req, res, next) => {
  const { paymentId, PayerID } = req.query;
  const execute_payment_json = {
    payer_id: PayerID,
  };
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.error("PayPal Payment Execution Error:", error);
        return next(new ErrorHandler(500, error.response));
      } else {
        console.log("Get Payment Response");
        console.log(JSON.stringify(payment));
        return res.status(200).json({
          success: true,
          payment,
        });
      }
    }
  );
});

const verifyPaymentCancel = TryCatch(async (req, res, next) => {
  console.log("Payment Cancelled");
  res.status(200).json({ success: true, message: "Payment cancelled" });
});

export {
  createStripePayment,
  createRazorpayPayment,
  createPayPalPayment,
  verifyPaymentSuccess,
  verifyPaymentCancel,
};
