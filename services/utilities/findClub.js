const { Club } = require("../../database/index");

const findClub = async (clubId) => {
  const club = await Club.findOne({ where: { id: clubId } });
  if (!club) {
    await createClub(clubId);
    return await Club.findOne({ where: { id: clubId } });
  } else {
    return club;
  }
};

module.exports = { findClub };
