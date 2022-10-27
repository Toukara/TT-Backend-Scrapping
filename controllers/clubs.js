const axios = require("axios");
const cheerio = require("cheerio");

const { Club } = require("../models");
const { createPlayers } = require("./players");

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

const createClub = async (clubId) => {
  const clubDatas = await fetchClubDatas(clubId);

  console.log(clubDatas);

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

const fetchClubDatas = async (clubId) => {
  const response = await axios.get(`https://www.pingpocket.fr/app/fftt/clubs/${clubId}/coordonnees`, options);
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
};
const findClub = async (clubId) => {
  const club = await Club.findOne({ where: { id: clubId } });
  if (!club) {
    await createClub(clubId);
    return await Club.findOne({ where: { id: clubId } });
  } else {
    return club;
  }
};

module.exports = {
  createClub,
  findClub,
};
