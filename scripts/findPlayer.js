const { models } = require("../database");
const { Player } = models;

async function findPlayer(playerId) {
  const player = await Player.findOne({ id: playerId });

  if (player) {
    return { status: 200, data: player, message: "Player found" };
  }
  return { status: 404, data: null, message: "Test" };
}

module.exports = findPlayer;