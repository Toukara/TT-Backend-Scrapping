const axios = require("axios");
const cheerio = require("cheerio");

const { fetchPlayerPoints } = require("./fetchPlayerPoints");
const options = require("../../config/options.json");

const fetchPlayers = async (clubId) => {
  const response = await axios.get(`https://www.pingpocket.fr/app/fftt/clubs/${clubId}/licencies?SORT=OFFICIAL_RANK`, options);

  const players = [];

  const $ = cheerio.load(response.data);

  // Get the players' names
  $("li.arrow a p").each((i, el) => {
    if (i % 2 === 0) {
      players.push({
        name: $(el).html(),
      });
    } else return;
  });

  // Get the players' ids
  $("li.arrow a").each((i, el) => {
    players[i].licence = $(el).attr("href").split("/")[4].split("?")[0];
  });

  // Get the players' points
  for (let i = 0; i < players.length; i++) {
    const response = await fetchPlayerPoints(players[i].licence);
    players[i].points = response;
  }

  console.log(players);
  return players;
};

module.exports = {
  fetchPlayers,
};
