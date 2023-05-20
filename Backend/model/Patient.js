const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  patientId: {
    type: String,
    required: true,
  },
  hospitalId: {
    type: String,
    default: "000",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  bloodGroup: {
    type: String,
  },
  bmi: {
    type: Number,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
