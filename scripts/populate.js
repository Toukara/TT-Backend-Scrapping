const { saveClub, savePlayers } = require("../utils/scraper.js");

const clubId = "07021006";
// const clubId = "07620100";

saveClub(clubId)
  .then((club) => {
    console.log(club.name);
    savePlayers(club.id);
  })
  .catch((err) => {
    console.error(err);
  });
