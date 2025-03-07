import mongoose from "mongoose";

const KYCSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    documentType: {
      type: String,
      enum: ["passport", "driving_license", "id_card"],
      required: true,
    },
    documentURL: {
      type: String,
      required: true,
    },
    // Optional: status of the KYC verification process
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const KYC = mongoose.model("KYC", KYCSchema);
