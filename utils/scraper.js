const cheerio = require("cheerio");
const axios = require("../lib/axios");

const { models } = require("../database");
const { Club, Player } = models;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Scrapes the club from the website from a given id.
 *
 * @param {string} cid - The club id.
 */
async function getClub(cid) {
  const { data: page } = await axios.get(`/clubs/${cid}/coordonnees`);
  const $ = cheerio.load(page);

  const club = {
    id: cid,
    name: $("h1").html(),
    address: undefined,
    contacts: {
      phone: undefined,
      email: undefined,
      name: $("li.item-container div.labels p").html(),
    },
  };

  $("li.forward div.labels p").each((i, el) => {
    let text = $(el).text();
    if (text.includes("@")) {
      club.contacts.email = text;
    } else if (text.includes("0")) {
      club.contacts.phone = text;
    }
  });

  $("ul.rounded li:nth-child(1) p").each((i, el) => {
    if (i === 2) {
      const addrReg = /(?:\s+)?\<br\>(?:\s+)?/;
      club.address = $(el).html().split(addrReg).join(" ");
    }
  });

  return club;
}

/** Scrapes the players from the website from a given club id.
 *
 * @param {*} cid
 */
async function getPlayers(cid) {
  try {
    const { data: page } = await axios.get(`/clubs/${cid}/licencies?SORT=OFFICIAL_RANK`);
    const $ = cheerio.load(page);

    const players = [];

    // timeout to avoid being blocked by the website
    for (let i = 0; i < $("a.item-container").length; i++) {
      const player = await getPlayer($("a.item-container").eq(i), cid);
      players.push(player);
      await sleep(80);
    }

    return players;
  } catch (err) {
    console.error(err.message);
  }
}

/** Scrapes the players from a given club page.
 *
 * @param {Cheerio} el - The cheerio instance.
 * @param {string} cid - The club id.
 * @returns {Promise<Object>} The player.
 */
async function getPlayer(el, cid) {
  try {
    let label = el.find(".labels");
    let [first, last] = label.text().trim().split(" ");

    let licenseReg = /\/licencies\/(\d+)\?/;
    let license = el.attr("href").match(licenseReg)[1];

    const { data: page } = await axios.get(`/licencies/${license}?CLUB_ID=${cid}`);
    const $ = cheerio.load(page);

    let info = $(".info.border p");
    let clubname = info.text().split("\n")[2].split("-")[0].trim();

    let points1 = {
      classement: "5",
      officiels: "500",
      firstPhase: "500",
      secondPhase: "500",
      monthlyProgression: 0,
      allProgression: 0,
    };

    let points2 = {
      classement: "5",
      officiels: "500",
      firstPhase: "500",
      monthlyProgression: 0,
      allProgression: 0,
    };

    $("li.item-container small").length > 5 ? (points = points1) : (points = points2);

    const player = {
      license,
      clubId: cid,
      clubName: clubname,
      firstname: first,
      lastname: last,
      points: points,
    };

    $("li.item-container small").each((i, el) => {
      // since we sorted the player object to that the UI
      // we can use the index of each element/key instead of a if/else
      let keys = Object.keys(player.points);
      player.points[keys[i]] = $(el).text();
    });

    console.log(player);
    // console.log(player.firstname, player.lastname, player.license);
    return player;
  } catch (err) {
    console.error(err.config.url);
  }
}

/** Scrapes the club from the website from a given id, and saves it to the database.
 *
 * If the club already exists in the database, it will be updated -
 * otherwise, it will be created.
 *
 * @param {string} cid - The club id.
 * @returns {Promise<Club>} The club.
 */
async function saveClub(cid) {
  const exists = await Club.findOne({ where: { id: cid } });
  if (exists) {
    await exists.update(await getClub(cid));
    return exists;
  }

  const club = await getClub(cid);
  return await Club.create(club);
}

/** Scrapes the players from the website from a given club id, and saves them to the database.
 *
 * If the players already exists in the database, they will be updated -
 * otherwise, they will be created.
 *
 * @param {Club} club - The club instance.
 */
async function savePlayers(club) {
  if (!club) throw new Error("No club provided");

  const players = await getPlayers(club);

  for (let player of players) {
    const exists = await Player.findOne({ where: { license: player.license } });
    if (exists) {
      await exists.update(player);
      continue;
    }
    await Player.create(player);
  }
}

module.exports = { getClub, saveClub, getPlayers, savePlayers };
