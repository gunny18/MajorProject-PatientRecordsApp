const express = require("express");
const router = express.Router();
const { logoutHospital } = require("../../controller/hospital/logoutHospital");

router.post("/", logoutHospital);

module.exports = router;
