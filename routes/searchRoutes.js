const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define the MongoDB connection

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Define a schema for your search collection
const searchSchema = new mongoose.Schema({
  query: String,
  location: String,
  type: String,
  budget: String,
  brand: String,
  year: Number, // Ensure year is defined as Number
  fuelType: String,
  path: String,
});
const Search = mongoose.model("search", searchSchema);

// Define your search route
router.get("/results", async (req, res) => {
  try {
    // Extract search parameters from the request query
    const { query, location, type, budget, brand, year, fuelType, path } =
      req.query;

    // Construct a MongoDB query based on the search parameters
    const searchQuery = {};
    if (query) searchQuery.query = query;
    if (location) searchQuery.location = location;
    if (type) searchQuery.type = type;
    if (budget) searchQuery.budget = budget;
    if (brand) searchQuery.brand = brand;
    if (year) searchQuery.year = year; // Parse year as a Number
    if (fuelType) searchQuery.fuelType = fuelType;
    if (path) searchQuery.path = path;
    // Perform the search in the MongoDB collection
    const searchResults = await Search.find(searchQuery);
    console.log(searchQuery);
    // Render the searchResults.ejs file with the search results
    res.render("searchResults", { searchResults: searchResults });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
