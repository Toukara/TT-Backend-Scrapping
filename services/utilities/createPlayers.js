const { Player } = require("../../database/index");

const { fetchPlayers } = require("./fetchPlayers");

const createPlayers = async (clubId) => {
  const players = await fetchPlayers(clubId);
  let playersCreated = 0;

  for (const player of players) {
    const playerdb = {
      firstName: player.name.split(" ")[0],
      lastName: player.name.split(" ")[1],
      licence: player.licence,
      points: player.points,
      clubId: clubId,
    };

    const [user, created] = await Player.findOrCreate({
      where: { licence: playerdb.licence },
      defaults: playerdb,
    });
    if (created) {
      playersCreated++;
    } else {
      if (user.points.officiels !== playerdb.points.officiels) {
        console.log("Player points changed", user.get({ plain: true }));
        user.points = playerdb.points;
        user.save();
      }
    }
  }

  console.log(playersCreated, "players created");
};

module.exports = { createPlayers };
