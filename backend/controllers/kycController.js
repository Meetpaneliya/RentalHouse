import { KYC } from "../models/KYC.js";
import { TryCatch } from "../middlewares/error.js";
import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv();

const onfidoClient = axios.create({
  baseURL: process.env.ONFIDO_BASEURL,
  headers: {
    Authorization: `Token token=${process.env.ONFIDO_TOKEN}`,
    "Content-Type": "application/json",
  },
});

const createApplication = TryCatch(async (req, res, next) => {
  const { firstName, lastName, email, documentType, documentURL } = req.body;

  const userId = req.user && req.user.id;
  if (!userId) {
    return next(new ErrorHandler(401, "Unauthorized: Please login"));
  }

  if (!firstName || !lastName || !email) {
    return next(
      new ErrorHandler(400, "First name, last name, and email are required")
    );
  }

  if (!documentType || !documentURL) {
    return next(
      new ErrorHandler(400, "Document type and document URL are required")
    );
  }

  const existingKYC = await KYC.findOne({ user: userId });
  if (existingKYC) {
    return res
      .status(400)
      .json({ success: false, message: "KYC already submitted" });
  }

  const applicationData = {
    first_name: firstName,
    last_name: lastName,
    email,
  };

  const onfidoResponse = await onfidoClient.post(
    "/applications",
    applicationData
  );

  const kyc = await KYC.create({
    user: userId,
    documentType,
    documentURL,
  });

  res.status(201).json({
    success: true,
    message: "KYC document uploaded",
    onfidoResponse,
    kyc,
  });
});

// Get KYC status for a user
const getKYCStatus = TryCatch(async (req, res, next) => {
  const userId = req.user.id;
  const kyc = await KYC.findOne({ user: userId });

  if (!kyc)
    return res
      .status(404)
      .json({ success: false, message: "No KYC record found" });

  res.status(200).json({ success: true, kyc });
});

// Admin verifies KYC
const verifyKYC = TryCatch(async (req, res, next) => {
  const { userId, status } = req.body; // Only Admin can update status

  if (!["Pending", "Verified", "Rejected"].includes(status)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid KYC status" });
  }

  const updatedKYC = await KYC.findOneAndUpdate(
    { user: userId },
    { status },
    { new: true }
  );

  if (!updatedKYC)
    return res
      .status(404)
      .json({ success: false, message: "KYC record not found" });

  res
    .status(200)
    .json({ success: true, message: "KYC status updated", kyc: updatedKYC });
});

export { createApplication, getKYCStatus, verifyKYC };
