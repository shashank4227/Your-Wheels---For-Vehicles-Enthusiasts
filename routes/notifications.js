const express = require("express");
const bodyParser = require("body-parser");
const Notification = require("../models/Notifications");

const app = express();

// Handle the form submission to send notifications
app.post("/send-notification", async (req, res) => {
  const { title, message } = req.body;
  try {
    // Create notification in MongoDB
    const notification = new Notification({ title, message });
    await notification.save();
    res.redirect("/employeePageUsers");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next(); // User is authenticated, proceed to the next middleware
  } else {
    const script =
      "<script>alert('Please login to continue.'); window.location='/login';</script>";
    res.send(script); // Send the script to display the alert and redirect to the login page
  }
};

app.get("/notification", isAuthenticated, async (req, res) => {
  try {
    // Retrieve notifications from MongoDB
    const notifications = await Notification.find().exec();
    res.render("notifications", { notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = app;
