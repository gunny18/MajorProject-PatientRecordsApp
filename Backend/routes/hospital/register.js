const express = require("express");
const router = express.Router();
const {
  registerHospital,
} = require("../../controller/hospital/registerHospital");

router.post("/", registerHospital);

module.exports = router;
