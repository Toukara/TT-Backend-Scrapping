const BaseController = require("./BaseController");
const { CreateClub, FindClub } = require("../scripts");

class ClubsController extends BaseController {
  static Model = "Club";

  constructor(req, res) {
    super(req, res);
  }

  async create(id) {
    console.log("id", id);
    const club = await CreateClub(this.req.params.id);
    this.res.status(club.status).json(club);
  }

  async show(id) {
    console.log("id", id);
    const clubFound = await FindClub(id);

    this.res.status(clubFound.status).json({ data: clubFound.data, message: clubFound.message });
  }
}

module.exports = ClubsController;
