const express = require("express");
const router = express.Router();
const { loginHospital } = require("../../controller/hospital/loginHospital");

router.post("/", loginHospital);

module.exports = router;
