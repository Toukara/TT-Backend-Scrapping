const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};


let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config.env);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

console.log(path.join(__dirname, "models"));

fs.readdirSync(path.join(__dirname, "models"))
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, "models", file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

db.sequelize = sequelize;

sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

module.exports = db;
