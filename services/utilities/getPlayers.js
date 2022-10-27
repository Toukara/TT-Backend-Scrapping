const { Player } = require("../../database");

const getPlayers = async (req, res) => {
  const club = await Club.findOne({ where: { id: req.params.id } });
  if (!club) {
    await createClub(req.params.id);
    res.send("Club created");
  } else {
    const players = await Player.findAll({ where: { clubId: req.params.id } });
    res.send(players);
  }
};

module.exports = {
  getPlayers,
};
