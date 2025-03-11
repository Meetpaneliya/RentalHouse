import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import { connectDB } from "./lib/db.js";
import { errorMiddleware } from "./middlewares/error.js";
import { app, server } from "./lib/socket.js";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config({ path: "./.env" });

export const envMode = process.env.NODE_ENV || "DEVELOPMENT";
const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "mongodb+srv://jenil1234:jenil1234@cluster0.plnld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
  origin:"http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(morgan("dev"));

// Import Routes
import userRoutes from "./routes/userRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";

// Error Middleware
app.use(errorMiddleware);

// API Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/listings", listingRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Handle 404 Errors
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

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