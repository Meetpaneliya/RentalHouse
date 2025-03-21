import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import { connectDB } from "./lib/db.js";
import { errorMiddleware } from "./middlewares/error.js";
import * as AdminJSMongoose from "@adminjs/mongoose";
import cookieParser from "cookie-parser";

// Import Models FIRST
import { User } from "./models/user.js";
import { Listing } from "./models/listing.js";
import { KYC } from "./models/KYC.js";

// AdminJS setup
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";

// Load environment variables
dotenv.config({ path: "./.env" });
const app = express();

// Register AdminJS adapter for Mongoose
AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

// Create the AdminJS instance and register resources
const admin = new AdminJS({
  rootPath: "/admin",
  resources: [
    {
      resource: User,
      options: {
        listProperties: ["name", "email", "role"],
        editProperties: ["name", "email", "password", "role"],
        showProperties: ["_id", "name", "email", "role", "createdAt"],
        filterProperties: ["name", "email", "role"],
      },
    },
    {
      resource: Listing,
      options: {
        properties: {
          "locationGeo.type": { label: "Geo Type" },
          "locationGeo.coordinates": { label: "Geo Coordinates" },
        },
        listProperties: ["title", "price", "status", "location"],
        editProperties: [
          "title",
          "description",
          "locationGeo.type",
          "locationGeo.coordinates",
          "status",
          "price",
          "size",
          "floor",
          "location",
          "images",
          "owner",
          "propertyType",
          "amenities",
          "rooms",
          "beds",
          "bathrooms",
        ],
        showProperties: [
          "_id",
          "title",
          "description",
          "locationGeo.type",
          "locationGeo.coordinates",
          "status",
          "price",
          "size",
          "floor",
          "location",
          "images",
          "owner",
          "propertyType",
          "amenities",
          "rooms",
          "beds",
          "bathrooms",
          "createdAt",
        ],
        filterProperties: ["status", "propertyType", "location"],
      },
    },
    {
      resource: KYC,
      options: {
        listProperties: ["user", "verificationType", "status"],
        editProperties: [
          "user",
          "verificationType",
          "ssn",
          "passportNumber",
          "passportDocument",
          "visaDocument",
          "status",
        ],
        showProperties: [
          "_id",
          "user",
          "verificationType",
          "ssn",
          "passportNumber",
          "passportDocument",
          "visaDocument",
          "status",
          "createdAt",
        ],
        filterProperties: ["verificationType", "status"],
        actions: {
          approve: {
            actionType: "record",
            icon: "Check",
            handler: async (request, response, context) => {
              const { record } = context;
              await record.update({ status: "approved" });
              return {
                record: record.toJSON(),
                notice: {
                  message: "KYC approved successfully",
                  type: "success",
                },
              };
            },
          },
          // You can add more custom actions here...
        },
      },
    },
    // Add more resources here...
    {
      resource: Review, // Register your Review model here
      options: {
        listProperties: ["user", "listing", "rating", "comment"],
        // Configure as needed
      },
    },
  ],
  locale: {
    language: "en",
    translations: {
      properties: {
        propertyType: "Property Type", // This maps the key to a human-friendly name.
      },
    },
  },
});

// Build and use the AdminJS router

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL || "admin@example.com",
  password: process.env.ADMIN_PASSWORD || "admin@example.com",
};

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
  authenticate,
  cookieName: "adminjs",
  cookiePassword: process.env.ADMIN_COOKIE_SECRET || "your-secret",
});
app.use(admin.options.rootPath, adminRouter);

// Application setup
export const envMode = process.env.NODE_ENV || "DEVELOPMENT";
const port = process.env.PORT || 4000;
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
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));

// Import API Routes
import userRoutes from "./routes/userRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js"; // ✅ Fixed Spelling
import reviewRoutes from "./routes/reviewRoutes.js";
import usePayment from "./routes/PaymentMethod.js"; // ✅ Fixed Import
import { Review } from "./models/Review.js";
import kycRoutes from "./routes/kycRoutes.js";
// Error Middleware
app.use(errorMiddleware);

// API Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/listings", listingRoutes);
app.use("/api/v1/favorites", favoriteRoutes);
app.use("/api/v1/reviews", reviewRoutes);

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
app.listen(port, () => {
  console.log(`Server running on Port: ${port} in ${envMode} Mode.`);
});

// Handle Uncaught Errors & Promise Rejections
process.on("uncaughtException", (err) => {
  console.error(` Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error(` Unhandled Promise Rejection: ${err.message}`);
});

// import express from "express";
// import helmet from "helmet";
// import cors from "cors";
// import morgan from "morgan";
// import dotenv from "dotenv";
// import cloudinary from "cloudinary";
// import { connectDB } from "./lib/db.js";
// import { errorMiddleware } from "./middlewares/error.js";
// import { app, server } from "./lib/socket.js";
// import cookieParser from "cookie-parser";

// // Load environment variables
// dotenv.config({ path: "./.env" });

// export const envMode = process.env.NODE_ENV || "DEVELOPMENT";
// const port = process.env.PORT || 4000;
// const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017";
// // Connect to MongoDB
// connectDB(mongoURI);

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Security & Middleware Setup
// app.use(
//   helmet({
//     contentSecurityPolicy: false, // Adjust helmet settings for APIs
//     crossOriginEmbedderPolicy: false,
//   })
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // CORS Configuration
// const corsOptions = {
//   origin:"http://localhost:5173",
//   credentials: true,
// };
// app.use(cors(corsOptions));

// app.use(morgan("dev"));

// // Import Routes
// import userRoutes from "./routes/userRoutes.js";
// import listingRoutes from "./routes/listingRoutes.js";
// import favoriteRotes from "./routes/favoriteRoutes.js";
// import reviewRoutes from "./routes/reviewRoutes.js";

// // Error Middleware
// app.use(errorMiddleware);

// // API Routes
// app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/listings", listingRoutes);
// app.use("/api/v1/favorites", favoriteRotes);
// app.use("/api/v1/reviews", reviewRoutes);

// // Default Route
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// // Handle 404 Errors
// app.all("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Page not found",
//   });
// });

// // Start Server
// server.listen(port, () =>
//   console.log(`Server running on Port: ${port} in ${envMode} Mode.`)
// );

// // Handle Uncaught Errors & Promise Rejections
// process.on("uncaughtException", (err) => {
//   console.error(` Uncaught Exception: ${err.message}`);
//   process.exit(1);
// });

// process.on("unhandledRejection", (err) => {
//   console.error(` Unhandled Promise Rejection: ${err.message}`);
// });
