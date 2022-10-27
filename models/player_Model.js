const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    static associate(models) {
     
    }
  }

  Player.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      licence: DataTypes.STRING,
      points: DataTypes.JSON,
      clubId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Player",
    }
  );

  return Player;
};
