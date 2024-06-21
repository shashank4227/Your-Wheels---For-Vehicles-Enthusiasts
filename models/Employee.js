const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  employeeUsername: {
    type: String,
    required: true,
    unique: true,
  },
  employeePassword: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model("Employee", userSchema);

module.exports = Employee;
