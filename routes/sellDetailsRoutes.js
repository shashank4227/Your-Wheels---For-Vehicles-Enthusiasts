// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const sellDetails = require("../models/sellDetailsModel"); // Assuming you have a RentDetails model defined

// Create an Express router
const router = express.Router();

// Route for displaying rent details of a specific user

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next(); // User is authenticated, proceed to the next middleware
  } else {
    const script =
      "<script>alert('Please login to continue.'); window.location='/login';</script>";
    res.send(script); // Send the script to display the alert and redirect to the login page
  }
};

const renderLoginPage = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login"); // If the user is not logged in, redirect to the login page
  } else {
    next(); // User is logged in, proceed to the next middleware
  }
};

// Middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static("public")); // Assuming your static files (like CSS and JS) are in a folder named 'public'

// Route for submitting rent details
const nodemailer = require("nodemailer");

// Create a transporter object using your SMTP transport details
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "yourwheels123@gmail.com",
    pass: "fjbd wpjz xhqa ezoa",
  },
});

router.post("/submit-sell-details", isAuthenticated, async (req, res) => {
  const newSellDetails = new sellDetails({
    name: req.body["your-name"],
    vehicleType: req.body["vehicle-type"],
    emailID: req.body["emailID"],
    location: req.body["location"],
    fuelType: req.body["fuelType"],
    registrationYear: req.body["registrationYear"],
    vehicleName: req.body["vehicle-name"],
    vehicleModel: req.body["vehicle-model"],
  });
  console.log(newSellDetails);
  try {
    // Save the sell details to the database
    const savedSellDetails = await newSellDetails.save();
    console.log("Sell details saved successfully:", savedSellDetails);

    // Send email to the user
    const mailOptions = {
      from: "yourwheels123@gmail.com",
      to: req.body.emailID,
      subject: "Vehicle Sell Details",
      html: `
          <h1>Thank you for selling your vehicle with us!</h1>
          <p>Here are the details of your sale:</p>
          <ul>
            <li>Name: ${req.body["your-name"]}</li>
            <li>Vehicle Type: ${req.body["vehicle-type"]}</li>
            <li>Location: ${req.body["location"]}</li>
            <li>Fuel Type: ${req.body["fuelType"]}</li>
            <li>Registration Year: ${req.body["registrationYear"]}</li>
            <li>Vehicle Name: ${req.body["vehicle-name"]}</li>
            <li>Vehicle Model: ${req.body["vehicle-model"]}</li>
          </ul>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.redirect("/");
  } catch (err) {
    console.error("Error saving sell details:", err);
    res.status(500).send("Error saving sell details");
  }
});

// Export the router
module.exports = router;
