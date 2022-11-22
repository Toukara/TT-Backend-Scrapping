const BaseController = require("./BaseController");
const { models } = require("../database");
const { Player } = models;

class PlayersController extends BaseController {
  static Model = "Player";

  constructor(req, res) {
    super(req, res);
  }

  async index() {
    const players = await Player.findAll();
    this.res.status(200).json(players);
  }

  async show(pid) {
    const player = await Player.findOne({ where: { license: pid } });
    if (!player) {
      return this.res.status(404).json({ error: "Player not found" });
    } else {
      return this.res.status(200).json(player);
    }
  }
}

module.exports = PlayersController;
