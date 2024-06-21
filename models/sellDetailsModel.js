const mongoose = require("mongoose");

// Define the schema
const sellDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emailID: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  registrationYear: {
    type: String,
    required: true,
  },
  vehicleName: {
    type: String,
    required: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
});

// Create and export the model
module.exports = mongoose.model("SellDetails", sellDetailsSchema);
