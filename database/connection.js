const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config.env);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// console log where the database is located
console.log("Database: " + config.database);

module.exports = sequelize;
