const express = require("express");
const bodyParser = require("body-parser");
const RentDetails = require("../models/RentDetailsModel"); // Assuming your model file is in a "models" directory

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/rented-vehicles/:username", async (req, res) => {
  const username = req.params.username;
  try {
    // Fetch rented vehicles data for the specified username from the database
    const userVehicles = await RentDetails.find({ name: username });

    // Render the rentedVehicles.ejs template with the rented vehicles data
    res.render("rentedVehicles", { user: username, userVehicles });
  } catch (error) {
    console.error("Error fetching rented vehicles:", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = app;
