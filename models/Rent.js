const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const Rent = mongoose.model("Rent", rentSchema);

module.exports = Rent;
