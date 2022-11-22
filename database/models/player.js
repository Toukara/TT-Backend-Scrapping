const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    static associate(models) {
      Player.belongsTo(models.Club, {
        foreignKey: "clubId",
        as: "club",
      });
    }
  }

  Player.init(
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      license: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      points: {
        type: DataTypes.JSON,
        allowNull: false,
        default: {}
      },
      clubId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Player",
    }
  );

  return Player;
};
