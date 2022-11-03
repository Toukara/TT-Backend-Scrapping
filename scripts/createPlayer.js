const cheerio = require("cheerio");
const axios = require("../lib/axios");

const { models } = require("../database");
const { Player } = models;

async function fetchPlayerDatas(clubId) {
  const players = [];

  const response = await axios.get(`/clubs/${clubId}/licencies?SORT=OFFICIAL_RANK`);
  const $ = cheerio.load(response.data);

  console.log("response", response.data);

  //   Get players names
  $("li.arrow a p").each((i, el) => {
    if (i % 2 === 0) {
      players.push({
        name: $(el).html(),
      });
    } else return;
  });

  // Get players licence number
  $("li.arrow a").each((i, el) => {
    players[i].licence = $(el).attr("href").split("/")[4].split("?")[0];
  });
  // Get players points

  for (let i = 0; i < players.length; i++) {
    const playerId = players[i].licence;
    const ptsResponse = await axios.get(`/licencies/${playerId}?CLUB_ID=${clubId}`);

    const $ = cheerio.load(ptsResponse.data);

    let playerPoints = {
      classement: "5",
      start: "500",
      officiels: "500",
      allProgression: 0,
      monthlyProgression: 0,
    };

    $("li.item-container small").each((i, el) => {
      if (i === 0) {
        playerPoints.classement = $(el).html();
      } else if (i === 1) {
        playerPoints.officiels = $(el).html();
      } else if (i === 2) {
        playerPoints.start = $(el).html();
      } else if (i === 3) {
        playerPoints.monthlyProgression = $(el).html();
      } else if (i === 4) {
        playerPoints.allProgression = $(el).html();
      } else return;
    });
    players[i].points = playerPoints;
  }
  return players;
}

async function createPlayer(clubId) {
  let playersCreated = 0;
  const playersData = await fetchPlayerDatas(clubId);

  console.log(playersData);

  for (const player of playersData) {
    const playerDB = {
      firstName: player.name.split(" ")[0],
      lastName: player.name.split(" ")[1],
      licence: player.licence,
      points: player.points,
      clubId: clubId,
    };

    const [user, created] = await Player.findOrCreate({
      where: { licence: playerDB.licence },
      defaults: playerDB,
    });
    if (created) {
      playersCreated++;
    } else {
      if (user.points.officiels !== playerDB.points.officiels) {
        console.log("Player points changed", user.get({ plain: true }));
        user.points = playerDB.points;
        user.save();
      }
    }
  }

  console.log(playersCreated, "players created");
}

module.exports = { createPlayer };
