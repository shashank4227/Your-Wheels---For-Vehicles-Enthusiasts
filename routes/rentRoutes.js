const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define the MongoDB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Define a schema for your showroom collection
const rentSchema = new mongoose.Schema({
  query: String,
  location: String,
  address: String,
  type: String,
  path: String,
});
const Rent = mongoose.model("rent", rentSchema);

router.get("/findRent", async (req, res) => {
  console.log("rent action");
  try {
    // Extract search parameters from the request query
    const { query, location, type, address, path } = req.query;
    console.log(req.query);
    // Construct a MongoDB query based on the search parameters
    const rentQuery = {};
    if (query) rentQuery.query = query;
    if (location) rentQuery.location = location;
    if (type) rentQuery.type = type;
    if (address) rentQuery.address = address;
    if (path) rentQuery.path = path;
    console.log(rentQuery);
    // Perform the search in the MongoDB collection
    const rentResults = await Rent.find(rentQuery);

    // Render the showroomsResults.ejs file with the search results
    res.render("rentResults", { rentResults: rentResults });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
