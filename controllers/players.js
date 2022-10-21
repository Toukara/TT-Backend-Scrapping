const axios = require("axios");
const cheerio = require("cheerio");

const { Club, Player } = require("../models");
const { createClub } = require("./clubs");

const options = {
  credentials: "include",
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
    Accept: "*/*",
    "Accept-Language": "en-GB,en;q=0.5",
    "X-Requested-With": "XMLHttpRequest",
    "Alt-Used": "www.pingpocket.fr",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
  },
  referrer: "https://www.pingpocket.fr/",
  method: "GET",
  mode: "cors",
};

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

const createPlayers = async (clubId) => {
  const players = await fetchPlayers(clubId);

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
      console.log("Player created", user.firstName);
    } else {
      if (user.points.officiels !== playerdb.points.officiels) {
        console.log("Player points changed", user.get({ plain: true }));
        user.points = playerdb.points;
        user.save();
      }
    }
  }
};

const fetchPlayers = async (clubId) => {
  const response = await axios.get(`https://www.pingpocket.fr/app/fftt/clubs/${clubId}/licencies?SORT=OFFICIAL_RANK`, options);

  const players = [];

  const $ = cheerio.load(response.data);
  $("li.arrow a p").each((i, el) => {
    if (i % 2 === 0) {
      players.push({
        name: $(el).html(),
      });
      // console.log($(el).html());
    } else return;
  });
  $("li.arrow a").each((i, el) => {
    players[i].licence = $(el).attr("href").split("/")[4].split("?")[0];
  });

  // Get player points
  for (let i = 0; i < players.length; i++) {
    const response = await getPlayerPoints(players[i].licence);
    players[i].points = response;
  }
  return players;
};

const getPlayerPoints = async (playerId, clubId) => {
  let playerStats = {
    classement: 0,
    start: 0,
    officiels: 0,
    allProgression: 0,
    monthlyProgression: 0,
  };
  const response = await axios.get(`https://www.pingpocket.fr/app/fftt/licencies/${playerId}?CLUB_ID=${clubId}`, options);
  const data = cheerio.load(response.data);
  const $ = data;
  $("li.item-container small").each((i, el) => {
    if (i === 0) {
      playerStats.classement = $(el).html();
    } else if (i === 1) {
      playerStats.officiels = $(el).html();
    } else if (i === 2) {
      playerStats.start = $(el).html();
    } else if (i === 3) {
      playerStats.monthlyProgression = $(el).html();
    } else if (i === 4) {
      playerStats.allProgression = $(el).html();
    } else return;
  });
  return playerStats;
};

module.exports = {
  getPlayers,
  createPlayers,
};
