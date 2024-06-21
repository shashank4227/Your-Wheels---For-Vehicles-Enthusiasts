// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const RentDetails = require("../models/RentDetailsModel"); // Assuming you have a RentDetails model defined

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

// Middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static("public")); // Assuming your static files (like CSS and JS) are in a folder named 'public'

// Set up Multer storage
// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/uploads/"); // Specify the directory where files will be uploaded
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

// Initialize Multer upload instance
const upload = multer({ storage: storage });

// Middleware to handle file uploads
router.use(
  upload.fields([
    { name: "aadhar-card", maxCount: 1 },
    { name: "driving-license", maxCount: 1 },
  ])
);

const Rent = require("../models/Rent"); // Import the Rent model

router.get("/rentNo", isAuthenticated, async (req, res) => {
  try {
    // Assuming you have some logic to determine which car details to retrieve
    const rent = await Rent.findOne({
      /* Your query criteria */
    });

    if (!rent) {
      // Handle case where car details are not found
      res.status(404).send("Car details not found");
      return;
    }

    // Extract relevant car details
    const car = {
      query: rent.query,
      location: rent.location,
      address: rent.address,
      path: rent.path,
    };

    // Render the rentNow template with car details
    res.render("rentNow", { car });
  } catch (err) {
    console.error("Error retrieving car details:", err);
    res.status(500).send("Error retrieving car details");
  }
});

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

router.post("/submit-rent-details", isAuthenticated, async (req, res) => {
  const newRentDetails = new RentDetails({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    pickupLocation: req.body["pickup-location"],
    dropoffLocation: req.body["dropoff-location"],
    pickupDate: req.body["pickup-date"],
    dropoffDate: req.body["dropoff-date"],
    aadharCard: req.files["aadhar-card"][0].path,
    drivingLicense: req.files["driving-license"][0].path,
    carQuery: req.body["car-query"],
    carLocation: req.body["car-location"],
    carAddress: req.body["car-address"],
    carImage: req.body["car-image"],
  });

  try {
    // Save the rent details to the database
    const savedRentDetails = await newRentDetails.save();
    console.log("Rent details saved successfully:", savedRentDetails);

    // Send email to the user
    const mailOptions = {
      from: "yourwheels123@gmail.com",
      to: req.body.email,
      subject: "Vehicle Rental Details",
      html: `
        <h1>Thank you for renting a vehicle with us!</h1>
        <p>Here are the details of your rental:</p>
        <ul>
          <li>Name: ${req.body.name}</li>
          <li>Phone: ${req.body.phone}</li>
          <li>Email: ${req.body.email}</li>
          <li>Pickup Location: ${req.body["pickup-location"]}</li>
          <li>Drop-off Location: ${req.body["dropoff-location"]}</li>
          <li>Pickup Date: ${req.body["pickup-date"]}</li>
          <li>Drop-off Date: ${req.body["dropoff-date"]}</li>
          <li>Car Query: ${req.body["car-query"]}</li>
          <li>Car Location: ${req.body["car-location"]}</li>
          <li>Car Address: ${req.body["car-address"]}</li>
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
    console.error("Error saving rent details:", err);
    res.status(500).send("Error saving rent details");
  }
});

// Export the router
module.exports = router;
