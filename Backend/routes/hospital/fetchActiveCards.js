const express = require("express");
const { getActiveCards } = require("../../controller/hospital/getActiveCards");
const router = express.Router();

router.post("/", getActiveCards);

module.exports = router;
