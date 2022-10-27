const express = require("express");
const router = express.Router();

const playersController = require("../controllers/players");

router.get("/:id/players/all", playersController.allPlayers);

module.exports = router;
