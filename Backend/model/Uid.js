const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uidSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Uid", uidSchema);
