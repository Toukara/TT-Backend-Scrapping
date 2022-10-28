const { Club, Player } = require("../database/index");

const { createClub } = require("./utilities/createClub");

const getPlayers = async (req) => {
  const club = await Club.findOne({ where: { id: req.params.id } });
  if (!club) {
    await createClub(req.params.id);
    return {
      message: "Club created",
      status: 201,
    };
  } else {
    const players = await Player.findAll({ where: { clubId: req.params.id } });
    return {
      message: "Players found",
      status: 200,
      players: players,
    };
  }
};

module.exports = {
  getPlayers,
};
