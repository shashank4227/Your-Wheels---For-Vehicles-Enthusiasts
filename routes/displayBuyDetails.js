const express = require("express");
const bodyParser = require("body-parser");
const buyDetails = require("../models/BuyDetailsModel");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/bought-vehicles/:username", async (req, res) => {
  const username = req.params.username;
  try {
    // Fetch rented vehicles data for the specified username from the database
    const buyVehiclesDetails = await buyDetails.find({ name: username });

    // Render the rentedVehicles.ejs template with the rented vehicles data
    res.render("vehiclesYouBought", {
      user: username,
      buyVehiclesDetails,
    });
  } catch (error) {
    console.error("Error fetching bought vehicles:", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = app;
