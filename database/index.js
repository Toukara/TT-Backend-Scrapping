const sequelize = require("./connection");
const { autoLoadModels } = require("./utils");

autoLoadModels(__dirname + "/models");

// Associate models


module.exports = sequelize;
