const express = require("express");
const Review = require("../models/Review"); // Assuming you have a Review model defined

const router = express.Router();

// Routes
router.get("/reviewPostin", async (req, res) => {
  try {
    const reviews = await Review.find(); // Fetch all reviews from the database
    res.render("reviewPosting", { reviews: reviews });
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
