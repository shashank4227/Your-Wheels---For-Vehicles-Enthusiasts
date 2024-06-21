// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const BuyDetails = require("../models/BuyDetailsModel");

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

router.post("/submit-buy-details", isAuthenticated, async (req, res) => {
  const newBuyDetails = new BuyDetails({
    vehicle: req.body.vehicle,
    color: req.body.color,
    location: req.body.location,
    fuelType: req.body.fuelType,
    registrationYear: req.body.registrationYear,
    name: req.body.name,
    email: req.body.email,
  });

  try {
    // Save the rent details to the database
    const savedBuyDetails = await newBuyDetails.save();
    console.log("Buy details saved successfully:", savedBuyDetails);

    // Send email to the user
    const mailOptions = {
      from: "yourwheels123@gmail.com",
      to: req.body.email,
      subject: "Details of Vehicle you bought",
      html: `
        <h1>Thank you for buying a vehicle from us!</h1>
        <p>Here are the details of your rental:</p>
        <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Vehicle Model: ${req.body.vehicle}</li>
        <li>Color: ${req.body.color}</li>
        <li>Location: ${req.body.location}</li>
        <li>Fuel Type: ${req.body.fuelType}</li>
        <li>Registration Year: ${req.body.registrationYear}</li>
        
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
    console.error("Error saving buy details:", err);
    res.status(500).send("Error saving buy details");
  }
});

// Export the router
module.exports = router;
