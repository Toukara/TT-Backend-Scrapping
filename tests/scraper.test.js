const { getClub, getPlayers } = require("../utils/scraper.js");

const clubId = "07620040";

test("Clubs datas are correctly scraped", async () => {
  const club = await getClub(clubId);
  // verify if club object is not empty
  expect(club).not.toBeNull();
});

jest.setTimeout(30000); // 30 seconds

test("Players datas are correctly scraped from the club", async () => {
  const players = await getPlayers(clubId);

  // verify if players array is not empty and add timer
  expect(players).not.toBeNull();
});
