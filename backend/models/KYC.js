import mongoose from "mongoose";

const KYCSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    verificationType: {
      type: String,
      enum: ["ssn", "passport"],
      required: true,
    },
    ssn: {
      type: String,
    },
    // For Passport verification
    passportNumber: {
      type: String,
    },
    passportDocument: {
      type: String,
    },
    visaDocument: {
      type: String,
    },
    // Additional personal information fields
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    // KYC status: pending, approved, or rejected
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const KYC = mongoose.model("KYC", KYCSchema);
