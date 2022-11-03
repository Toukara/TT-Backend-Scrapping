const { Sequelize, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    static associate(models) {
      Club.hasMany(models.Team, {
        foreignKey: "teamId",
        as: "team",
      });
      Club.hasMany(models.Player, {
        foreignKey: "clubId",
        as: "club",
      });
    }
  }

  Club.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      contacts: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Club",
    }
  );

  return Club;
};
