const BaseController = require("./BaseController");
const { FindPlayer, CreatePlayer } = require("../scripts");

class PlayersController extends BaseController {
  static Model = "Player";

  constructor(req, res) {
    super(req, res);
  }

  async index() {
    const players = await this.model.findAll();
    this.json(players);
  }

  async show(id) {
    const playerFound = await FindPlayer(id);

    this.res.status(playerFound.status).json(playerFound);
  }

  async update(id) {}

  async destroy(id) {
    const player = await this.model.findOne({ where: { licence: id } });
    if (player) {
      await player.destroy();
      this.status(204, null);
    } else {
      this.status(404, { error: "Player not found" });
    }
  }
}

module.exports = PlayersController;
