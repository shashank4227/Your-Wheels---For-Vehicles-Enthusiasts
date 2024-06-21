const express = require("express");
const User = require("../models/User"); // Assuming you have a Review model defined
const Employee = require("../models/Employee");
const router = express.Router();

// Routes
router.get("/adminPageUsers", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all reviews from the database
    const employees = await Employee.find();
    res.render("adminPage", { users: users, employees: employees });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
