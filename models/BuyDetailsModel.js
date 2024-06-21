// Define your model
const mongoose = require("mongoose");

const rentDetailsSchema = new mongoose.Schema({
  vehicle: {
    type: String,
    allowNull: false,
  },
  color: {
    type: String,
    allowNull: false,
  },
  location: {
    type: String,
    allowNull: false,
  },
  fuelType: {
    type: String,
    allowNull: false,
  },
  registrationYear: {
    type: String,
    allowNull: false,
  },
  name: {
    type: String,
    allowNull: false,
  },
  email: {
    type: String,
    allowNull: false,
  },
});

module.exports = mongoose.model("BuyDetails", rentDetailsSchema);
