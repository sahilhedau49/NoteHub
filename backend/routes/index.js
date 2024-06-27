const express = require("express");
const { createRoom } = require("../controllers/rooms");
const router = express.Router();

router.route("/createRoom").post(createRoom);

module.exports = router;
