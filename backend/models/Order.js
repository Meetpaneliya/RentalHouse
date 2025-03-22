import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    // Which payment gateway was used

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    gateway: {
      type: String,
      required: true,
      enum: ["paypal", "stripe", "razorpay"],
    },
    // Unique payment ID returned by the gateway
    paymentId: {
      type: String,
      required: true,
    },
    // For Razorpay: Order ID associated with the payment
    orderId: {
      type: String,
    },
    // Total amount paid (in smallest currency unit, e.g. cents or paise)
    amount: {
      type: Number,
      required: true,
    },
    // Currency code (e.g., "USD", "INR")
    currency: {
      type: String,
      required: true,
    },
    // Payment status: succeeded, pending, failed, etc.
    status: {
      type: String,
      required: true,
    },
    // Payment method details (e.g., card, paypal, bank_transfer)
    method: {
      type: String,
    },
    // Optionally store payer details (e.g., email)
    payerEmail: {
      type: String,
    },
    // You can store the full raw response from the gateway if needed
    rawResponse: {
      type: Object,
    },
    // Timestamps for record creation and updates
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Automatically update `updatedAt` on save
    timestamps: true,
  }
);

export default mongoose.model("Payment", PaymentSchema);
