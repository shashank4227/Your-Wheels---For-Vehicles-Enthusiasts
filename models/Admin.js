const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  adminUsername: {
    type: String,
    required: true,
    unique: true,
  },
  adminPassword: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", userSchema);

module.exports = Admin;
