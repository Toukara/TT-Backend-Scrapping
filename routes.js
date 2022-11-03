const PlayersController = require("./controllers/playersController.js");
const ClubsController = require("./controllers/clubsController.js");

const Router = require("./utils/router.js");
const router = new Router();

console.log(PlayersController);

router.resources("/players", PlayersController);
// /api/player/:id


// /api/clubs/:id
// /api/clubs/:id/players
router.resources("/clubs", ClubsController);


module.exports = router.router;
