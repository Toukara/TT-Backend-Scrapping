const { Player } = require("../../database/index");

const getPlayersById = async (req, res) => {
  const player = await Player.findOne({
    where: { licenceId: req.params.licenceId },
  });
  return {
    status: 200,
    message: "Player found",
    player: player,
  };
};

module.exports.getPlayersById = getPlayersById;
