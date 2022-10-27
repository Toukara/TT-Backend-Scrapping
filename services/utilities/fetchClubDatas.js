const axios = require("axios");
const cheerio = require("cheerio");

const options = require("../../config/options.json");

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

module.exports = { fetchClubDatas };
