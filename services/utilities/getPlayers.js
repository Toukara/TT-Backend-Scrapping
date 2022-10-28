const { Player, Club } = require("../../database/index");

const { createClub } = require("./createClub");

const getPlayers = async (req, res) => {
  const club = await Club.findOne({ where: { id: req.params.id } });
  if (!club) {
    await createClub(req.params.id);
    return {
      status: 201,
      message: "Club created",
    };
  } else {
    const players = await Player.findAll({ where: { clubId: req.params.id } });
    return {
      status: 200,
      message: "Players found",
      players: players,
    };
  }
};

module.exports.getPlayers = getPlayers;
