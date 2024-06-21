const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const User = require("../models/User"); // Import your User model
const Employee = require("../models/Employee");

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle the form submission for updating a user's account
app.post("/update/:username", async (req, res) => {
  const username = req.params.username;
  const newUsername = req.body.newUsername;
  const newPassword = req.body.newPassword;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = newUsername;
    user.password = newPassword;
    await user.save();

    res.redirect("/adminPageUsers"); // Corrected redirect URL
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/employeeupdateByAdmin/:username", async (req, res) => {
  const employeeUsername = req.params.employeeUsername;
  const newUsername = req.body.newUsername;
  const newPassword = req.body.newPassword;

  try {
    const user = await Employee.findOne({ employeeUsername: employeeUsername });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.employeeUsername = newUsername;
    user.employeePassword = newPassword;
    await user.save();

    res.redirect("/adminPageUsers"); // Corrected redirect URL
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/delete/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const deletedUser = await User.findOneAndDelete({ username: username });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.redirect("/adminPageUsers"); // Corrected redirect URL
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/employeedeleteByAdmin/:username", async (req, res) => {
  const employeeUsername = req.params.username;

  try {
    const deletedUser = await Employee.findOneAndDelete({
      employeeUsername: employeeUsername,
    });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.redirect("/adminPageUsers"); // Corrected redirect URL
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/create", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.redirect("/adminPageUsers"); // Corrected redirect URL
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/employeecreateByAdmin", async (req, res) => {
  const { employeeUsername, employeePassword } = req.body;

  try {
    const existingUser = await Employee.findOne({
      employeeUsername: employeeUsername,
    });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new Employee({ employeeUsername, employeePassword });
    await newUser.save();

    res.redirect("/adminPageUsers"); // Corrected redirect URL
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = app;
