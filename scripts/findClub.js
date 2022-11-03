const { models } = require("../database");
const { Club } = models;

async function findClub(clubId) {
  const club = await Club.findOne({ where: { id: clubId } });
  if (club) {
    return { status: 200, data: club, message: "Club found" };
  }
  return { status: 404, data: null, message: "Club not found" };
}

module.exports = findClub;
