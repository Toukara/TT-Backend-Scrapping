const PlayersController = require("./controllers/playersController.js");
const ClubsController = require("./controllers/clubsController.js");
const FilesController = require("./controllers/filesController.js");

const Router = require("./utils/router.js");
const router = new Router();

router.resources("/players", PlayersController);

let clubs = router.resources("/clubs", ClubsController);

clubs.route("/clubs/:id/players", "all", "GET", ClubsController);

router.resources("/files", FilesController);

module.exports = router.router;

// GET : /api/players
// get all players

// GET : /api/players/:pid
// get player by license number

// GET : /api/clubs
// get all clubs

// GET : /api/clubs/:id
// get club by id

// GET : /api/clubs/:id/players
// get all players from club by id

// POST : /api/clubs/:id
// create club by id and all players from club

// PUT : /api/clubs/:id
// update club by id and update all players from club

// DELETE : /api/clubs/:id
// delete club by id and delete all players from club
