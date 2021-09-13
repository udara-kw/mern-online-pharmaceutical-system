const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  address: {
    type: Object,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordResetCode: {
    type: String,
  },
  dateRegistered: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Users", userSchema);
