import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import { connectDB } from "./lib/db.js";
import { errorMiddleware } from "./middlewares/error.js";
import { app, server } from "./lib/socket.js";

// Load environment variables
dotenv.config({ path: "./.env" });

export const envMode = process.env.NODE_ENV || "DEVELOPMENT";
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017";

// Connect to MongoDB
connectDB(mongoURI);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Security & Middleware Setup
app.use(
  helmet({
    contentSecurityPolicy: false, // Adjust helmet settings for APIs
    crossOriginEmbedderPolicy: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// CORS Configuration
const corsOptions = {
  origin: envMode === "DEVELOPMENT" ? "*" : process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(morgan("dev"));

// Default Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Import Routes
import userRoutes from "./routes/userRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import kycRoutes from "./routes/kycRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import chatRoutes from "./routes/ChatMessage.js";
import cookieParser from "cookie-parser";
import paymentRoutes from "./routes/PaymentMethod.js";
import { seedUsers } from "./seed/userSeed.js";
import { seedListings } from "./seed/listingData.js";

// API Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/listings", listingRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/kyc", kycRoutes);
app.use("/api/v1/favorites", favoriteRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/payment", paymentRoutes);

// Handle 404 Errors
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

// Error Middleware
app.use(errorMiddleware);

// Start Server
server.listen(port, () =>
  console.log(`Server running on Port: ${port} in ${envMode} Mode.`)
);

// Handle Uncaught Errors & Promise Rejections
process.on("uncaughtException", (err) => {
  console.error(` Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error(` Unhandled Promise Rejection: ${err.message}`);
});
