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
  address: String,
  path: String,
});
const ServiceCentres = mongoose.model("serviceCentres", showroomsSchema);

router.get("/findServiceCentres", async (req, res) => {
  try {
    // Extract search parameters from the request query
    const { query, location, address, path } = req.query;

    // Construct a MongoDB query based on the search parameters
    const serviceCentresQuery = {};
    if (query) serviceCentresQuery.query = query;
    if (location) serviceCentresQuery.location = location;
    if (address) serviceCentresQuery.address = address;
    if (path) serviceCentresQuery.path = path;

    // Perform the search in the MongoDB collection
    const serviceCentersResults = await ServiceCentres.find(
      serviceCentresQuery
    );

    // Render the showroomsResults.ejs file with the search results
    res.render("serviceCentresResults", {
      serviceCentersResults: serviceCentersResults,
    });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
