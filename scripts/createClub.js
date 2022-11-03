const cheerio = require("cheerio");
const axios = require("../lib/axios");

const { models } = require("../database");
const { Club } = models;

const { createPlayer } = require("./createPlayer");

async function fetchClubDatas(clubId) {
  const response = await axios.get(`/clubs/${clubId}/coordonnees`);
  const $ = cheerio.load(response.data);

  contactsData = [];

  $("li.forward div.labels p").each((i, el) => {
    if (i % 2 === 0 && i <= 2) {
      contactsData.push($(el).html());
    }
  });

  const club = {
    name: $("h1").html(),
    id: clubId,
    contacts: { phone: contactsData[0], email: contactsData[1], name: $("li.item-container div.labels p").html() },
  };

  $("ul.rounded li:nth-child(1)").each((i, el) => {
    if (i === 1) {
      club.address = $(el)
        .text()
        .replace(/<(\w+)>(.*?)<\/\1>/, " ");
    }
  });

  return club;
}

async function createClub(clubId) {
  const clubDatas = await fetchClubDatas(clubId);

  const club = await Club.create(clubDatas);
  await createPlayer(clubId);

  return { status: 201, data: club, message: "Club created" };
}

module.exports = createClub;
