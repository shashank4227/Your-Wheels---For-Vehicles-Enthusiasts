const express = require("express");
const bodyParser = require("body-parser");
const sellDetails = require("../models/sellDetailsModel");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/vehicle-on-sale/:username", async (req, res) => {
  const username = req.params.username;
  try {
    // Fetch rented vehicles data for the specified username from the database
    const sellVehiclesDetails = await sellDetails.find({ name: username });

    // Render the rentedVehicles.ejs template with the rented vehicles data
    res.render("vehicleOnSale", {
      user: username,
      sellVehiclesDetails,
    });
  } catch (error) {
    console.error("Error fetching rented vehicles:", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = app;
