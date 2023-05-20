const express = require("express");
const router = express.Router();
const { getUsers } = require("../../controller/users/testUsersController");

router.get("/", getUsers);

module.exports = router;
