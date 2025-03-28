import {Review} from "../models/Review.js";
import { TryCatch } from "../middlewares/error.js";

// Add a review to a listing
const addReview = TryCatch(async (req, res, next) => {
  const { listingId, rating, comment } = req.body;
  const userId = req.user._id;

  const existingReview = await Review.findOne({ user: userId, listing: listingId });
  if (existingReview) return res.status(400).json({ success: false, message: "You have already reviewed this listing" });

  const review = await Review.create({ user: userId, listing: listingId, rating, comment });
  res.status(201).json({ success: true, message: "Review added successfully", review });
});

const getReviewsByListing = TryCatch(async (req, res, next) => {
  const { listingId } = req.params; // Extract listing ID from request params

  const reviews = await Review.find({ listing: listingId })
    .populate("user", "name") // Populate user details (only name)
    .sort({ createdAt: -1 }); // Sort by newest first

  if (!reviews.length) {
    return res.status(404).json({ success: false, message: "No reviews found for this listing" });
  }

  res.status(200).json({ success: true, reviews });
});

// Get reviews by a specific user
const getUserReviews = TryCatch(async (req, res, next) => {
  const userId = req.user.id;
  const reviews = await Review.find({ user: userId }).populate("listing");
  res.status(200).json({ success: true, reviews });
});

// Delete a review
const deleteReview = TryCatch(async (req, res, next) => {
  const { reviewId } = req.params;
  const deletedReview = await Review.findOneAndDelete({ _id: reviewId, user: req.user.id });

  if (!deletedReview) return res.status(404).json({ success: false, message: "Review not found" });

  res.status(200).json({ success: true, message: "Review deleted successfully" });
});

export { addReview,getReviewsByListing ,getUserReviews, deleteReview };
