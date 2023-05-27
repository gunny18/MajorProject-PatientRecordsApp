const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uidSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Uid", uidSchema);
