const express = require("express");
const router = express.Router();
const { handleLogin } = require("../../controller/auth/authController");

router.post("/", handleLogin);

module.exports = router;
