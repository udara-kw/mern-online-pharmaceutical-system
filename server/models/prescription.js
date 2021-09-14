const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  prescriptionFileName: {
    type: String,
  },
  address: {
    type: Object,
  },
  note: {
    type: String,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
  },
  status: {
    type: String,
  },
  dateSubmitted: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
