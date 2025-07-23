const express = require("express");
const router = express.Router();
const { receiveBotMessage } = require("../controllers/botController");

router.post("/message", receiveBotMessage);

module.exports = router;
