const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const hospitalSchema = new Schema({
  hospitalName: {
    type: String,
    required: true,
  },
  hospitalId: {
    type: String,
    default: crypto.randomBytes(8).toString("hex"),
  },
  patientIds: {
    type: Array,
  },
  hospitalEmail: {
    type: String,
    required: true,
  },
  hospitalPassword: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Hospital", hospitalSchema);
