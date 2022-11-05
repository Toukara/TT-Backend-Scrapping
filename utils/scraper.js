const cheerio = require("cheerio");
const axios = require("../lib/axios");

// const { models } = require("../database");
// const { Club, Player } = models;

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
		if (i % 2 === 0 && i <= 2) {
			// contacts.push($(el).html());
		}
	});

	$("ul.rounded li:nth-child(1)").each((i, el) => {
		if (i === 1) {
			const addrReg = /<(\w+)>(.*?)<\/\1>/;
			club.address = $(el).text().replace(addrReg, " ");
		}
	});

	return club;
}

/** Scrapes the players from the website from a given club id.
 *
 * @param {*} cid
 */
async function getPlayers(cid) {
	const { data: page } = await axios.get(`/clubs/${cid}/licencies?SORT=OFFICIAL_RANK`);
	const $ = cheerio.load(page);

	let players = $("li.arrow a").map((i, el) => getPlayer($(el), cid));
	players = await Promise.all(players.get());

	return players;
}

/** Scrapes the players from a given club page.
 *
 * @param {Cheerio} el - The cheerio instance.
 * @param {string} cid - The club id.
 * @returns {Promise<Object>} The player.
 */
async function getPlayer(el, cid) {
	let label = el.find(".labels");
	let [first, last] = label.text().trim().split(" ");

	let licenseReg = /\/licencies\/(\d+)\?/;
	let license = el.attr("href").match(licenseReg)[1];

	const { data: page } = await axios.get(`/licencies/${license}?CLUB_ID=${cid}`);
	const $ = cheerio.load(page);

	const player = {
		license,
		clubId: cid,
		firstname: first,
		lastname: last,
		points: {
			classement: "5",
			officiels: "500",
			start: "500",
			monthlyProgression: 0,
			allProgression: 0,
		},
	};

	$("li.item-container small").each((i, el) => {
		// since we sorted the player object to that the UI
		// we can use the index of each element/key instead of a if/else
		let keys = Object.keys(player.points);
		player.points[keys[i]] = $(el).text();
	});

	return player;
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
	const exists = await Club.findOne({ id: cid });
	if (exists) return exists; // TODO: handle updating

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

	const players = await getPlayers(cid);
	return await Player.insertMany(players);
}

module.exports = { getClub, saveClub, getPlayers, savePlayers };
