const axios = require("axios");
const cheerio = require("cheerio");

const options = require("../../config/config").fetchOptions;

const fetchPlayerPoints = async (playerId, clubId) => {
  let playerStats = {
    classement: "5",
    start: "500",
    officiels: "500",
    allProgression: 0,
    monthlyProgression: 0,
  };

  const response = await axios.get(`https://www.pingpocket.fr/app/fftt/licencies/${playerId}?CLUB_ID=${clubId}`, options);
  const $ = cheerio.load(response.data);

  // Get the player's points and progression
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
  fetchPlayerPoints,
};
