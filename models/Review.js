const mongoose = require("mongoose");

// Define the schema for a review
const reviewSchema = new mongoose.Schema({
  vehicleName: String,
  vehicleModel: { type: String, required: true },
  reviewHeading: String,
  reviewerName: String,
  submittedDate: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: String,
});

// Create a model using the schema
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
