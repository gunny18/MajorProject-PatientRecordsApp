const express = require("express");
const router = express.Router();
const { registerUser } = require("../../controller/auth/register");

router.post("/", registerUser);

module.exports = router;
