const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
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
  },
});

module.exports = mongoose.model("Users", userSchema);
