const mongoose = require("mongoose");

// Define the schema
const rentDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  dropoffLocation: {
    type: String,
    required: true,
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  dropoffDate: {
    type: Date,
    required: true,
  },
  aadharCard: {
    type: String, // Store file path or URL to the uploaded image
    required: true,
  },
  drivingLicense: {
    type: String, // Store file path or URL to the uploaded image
    required: true,
  },
  carQuery: {
    type: String,
    required: true,
  },
  carLocation: {
    type: String,
    required: true,
  },
  carAddress: {
    type: String,
    required: true,
  },
  carImage: {
    type: String,
    required: true,
  },
});

// Create and export the model
module.exports = mongoose.model("RentDetails", rentDetailsSchema);
