const { getPlayers } = require("../services/player");

const allPlayers = async (req, res) => {
  const results = await getPlayers(req);

  res.status(results.status).json(results);
};

const playerById = async (req, res) => {
  const results = await getPlayersById(req);

  res.status(results.status).json(results);
};

module.exports = {
  allPlayers,
  playerById,
};
