const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define the MongoDB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Define a schema for your showroom collection
const showroomsSchema = new mongoose.Schema({
  query: String,
  location: String,
  brand: String,
  address: String,
  path: String,
});
const Showrooms = mongoose.model("showrooms", showroomsSchema);

router.get("/findShowrooms", async (req, res) => {
  try {
    // Extract search parameters from the request query
    const { query, location, brand, address, path } = req.query;
    console.log(req.query);
    // Construct a MongoDB query based on the search parameters
    const showroomsQuery = {};
    if (query) showroomsQuery.query = query;
    if (location) showroomsQuery.location = location;
    if (brand) showroomsQuery.brand = brand;
    if (address) showroomsQuery.address = address;
    if (path) showroomsQuery.path = path;

    // Perform the search in the MongoDB collection
    const showroomsResults = await Showrooms.find(showroomsQuery);

    // Render the showroomsResults.ejs file with the search results
    res.render("showroomsResults", { showroomsResults: showroomsResults });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
