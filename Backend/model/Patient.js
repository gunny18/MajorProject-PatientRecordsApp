const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  patientId: {
    type: String,
    required: true,
  },
  records: {
    type: [
      {
        filename: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  hospitalId: {
    type: String,
    default: "000",
  },
  gender: {
    type: String,
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
  insurance: {
    type: String,
    default: "000",
  },
  dob: {
    type: String,
  },
  age: {
    type: String,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
