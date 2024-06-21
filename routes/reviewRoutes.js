// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Review = require("../models/Review"); // Assuming you have a Review model defined

// Create an Express router
const router = express.Router();

// Middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static("public")); // Assuming your static files (like CSS and JS) are in a folder named 'public'

// Route for submitting a review
router.post("/submit-review", async (req, res) => {
  const newReview = new Review({
    reviewerName: req.body["your-name"],
    vehicleType: req.body["vehicle-type"],
    rating: parseInt(req.body.rating),
    vehicleName: req.body["vehicle-name"],
    vehicleModel: req.body["vehicle-model"],
    date: req.body.date,
    comment: req.body["comment"],
    reviewHeading: req.body["review-title"],
  });
  console.log(newReview);
  try {
    // Save the review to the database
    const savedReview = await newReview.save();
    console.log("Review saved successfully:", savedReview);
    res.redirect("/reviewPostin");
  } catch (err) {
    console.error("Error saving review:", err);
    res.status(500).send("Error saving review");
  }
});

// Export the router
module.exports = router;
