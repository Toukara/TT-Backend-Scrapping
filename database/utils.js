const fs = require("fs");
const { join } = require("path");
const { DataTypes } = require("sequelize");
let models = {};

const sequelize = require("./connection");

module.exports.autoLoadModels = (path) => {
  let files = fs.readdirSync(path);

  files
    .filter((file) => {
      return file.indexOf(".") !== 0 && file !== "index.js";
    })
    .forEach((file) => {
      let model = require(join(path, file))(sequelize, DataTypes);
      models[model.name] = model;
    });

  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
  });
};
