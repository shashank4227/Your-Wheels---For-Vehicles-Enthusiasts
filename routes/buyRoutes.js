const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define the MongoDB connection

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Define a schema for your search collection
const buySchema = new mongoose.Schema({
  query: String,
  location: String,
  type: String,
  budget: String,
  brand: String,
  year: Number, // Ensure year is defined as Number
  fuelType: String,
  path: String,
});
const Buy = mongoose.model("buy", buySchema);

// Define your search route
router.get("/findBuy", async (req, res) => {
  try {
    // Extract search parameters from the request query
    const { query, location, type, budget, brand, year, fuelType, path } =
      req.query;

    // Construct a MongoDB query based on the search parameters
    const buyQuery = {};
    if (query) buyQuery.query = query;
    if (location) buyQuery.location = location;
    if (type) buyQuery.type = type;
    if (budget) buyQuery.budget = budget;
    if (brand) buyQuery.brand = brand;
    if (year) buyQuery.year = year; // Parse year as a Number
    if (fuelType) buyQuery.fuelType = fuelType;
    if (path) buyQuery.path = path;

    const buyResults = await Buy.find(buyQuery);
    console.log(buyQuery);

    res.render("buyResults", { buyResults: buyResults });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
