const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const User = require("../models/User"); // Import your User model

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle the form submission for updating a user's account
app.post("/updateUser/:username", async (req, res) => {
  const username = req.params.username; // Make sure this is the correct parameter name
  const newUsername = req.body.newUsername;
  const newPassword = req.body.newPassword;

  try {
    // Find the user by username
    const user = await User.findOne({ username: username }); // Find user by username
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's username and password
    user.username = newUsername;
    user.password = newPassword;
    await user.save();

    res.redirect("/employeePageUSers"); // Redirect back to the admin page after updating
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/deleteUser/:username", async (req, res) => {
  const username = req.params.username; // Get the username from the URL parameter

  try {
    // Find the user by username and delete
    const deletedUser = await User.findOneAndDelete({ username: username });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.redirect("/employeePageUsers"); // Redirect back to the admin page after deleting
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/createUser", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.redirect("/employeePageUsers"); // Redirect back to the admin page after creating the user
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = app;
