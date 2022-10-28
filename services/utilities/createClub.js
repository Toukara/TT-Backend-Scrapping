const { Club } = require("../../database/index");

const { fetchClubDatas } = require("./fetchClubDatas");
const { createPlayers } = require("./createPlayers");

const createClub = async (clubId) => {
  const clubDatas = await fetchClubDatas(clubId);

  const [club, created] = await Club.findOrCreate({
    where: { id: clubId },
    defaults: clubDatas,
  });
  await createPlayers(clubId);
  if (created) {
    console.log("Club created", club.name);
  } else {
    if (club.name !== clubDatas.name || club.adress !== clubDatas.adress || club.contacts !== clubDatas.contacts) {
      console.log("Club name changed", club.get({ plain: true }));
      club.name = clubDatas.name;
      club.save();
    }
  }
};

module.exports = { createClub };
