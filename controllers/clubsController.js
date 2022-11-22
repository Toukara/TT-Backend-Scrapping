const BaseController = require("./BaseController");
const { models } = require("../database");
const { Club, Player } = models;
const scrapper = require("../utils/scraper");

class ClubsController extends BaseController {
  static Model = "Club";

  constructor(req, res) {
    super(req, res);
  }

  async create(id) {
    const club = await scrapper.saveClub(id);
    const players = await scrapper.savePlayers(id);

    this.res.status(201).send({ club, players });
  }

  async index() {
    const clubs = await Club.findAll();
    this.res.status(200).json(clubs);
  }

  async show(id) {
    console.log(this.req.query);
    const club = await Club.findOne({ where: { id } });
    if (!club) {
      return this.res.status(404).json({ error: "Club not found" });
    } else {
      return this.res.status(200).json(club);
    }
  }

  async update(id) {
    const club = await Club.findOne({ where: { id } });
    if (!club) {
      return this.res.status(404).json({ error: "Club not found" });
    } else {
      const updatedClub = await scrapper.saveClub(id);
      return this.res.status(200).json(updatedClub);
    }
  }

  async destroy(id) {
    const club = await Club.findOne({ where: { id } });
    if (!club) {
      return this.res.status(404).json({ error: "Club not found" });
    } else {
      await Club.destroy({ where: { id } });
      await Player.destroy({ where: { clubId: id } });
      return this.res.status(204).send();
    }
  }

  async all(id) {
    const players = await Player.findAll({ where: { clubId: id } });
    if (!players) {
      return this.res.status(404).json({ error: "Club not found" });
    } else {
      return this.res.status(200).json(players);
    }
  }
}

module.exports = ClubsController;
