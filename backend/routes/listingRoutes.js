import express from "express";
import {
  getUserListings,
  createListing,
  updateListing,
  deleteListing,
  searchListings,
  SearchNearbyListings,
  getAllListings,
} from "../controllers/listingController.js";
import { protect } from "../middlewares/auth.js"; // Assuming authentication middleware
import { attachmentsMulter } from "../utils/multer.js";
const router = express.Router();

router.get("/get", protect, getUserListings); // Get user listings
router.get("/all-listings", protect, getAllListings);
router.get("/search", protect, searchListings); // Search listings by query
router.get("/nearby", protect, SearchNearbyListings); // Search listings by location
router.post("/create", protect, attachmentsMulter, createListing); // Create listing
router.put("/:id", protect, updateListing); // Update listing
router.delete("/:id", protect, deleteListing); // Delete listing

export default router;
