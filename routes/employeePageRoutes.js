const express = require("express");
const User = require("../models/User"); // Assuming you have a Review model defined

const router = express.Router();

// Routes
router.get("/employeePageUsers", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all reviews from the database
    res.render("employeePage", { users: users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
