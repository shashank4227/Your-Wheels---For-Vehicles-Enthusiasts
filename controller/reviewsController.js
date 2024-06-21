// controllers/reviewsController.js

const reviews = require("../models/reviews");

const reviewsController = {
  getAllReviews: (req, res) => {
    res.render("reviews", { reviews });
  },
};

module.exports = reviewsController;
