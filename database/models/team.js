const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      Team.belongsTo(models.Club, {
        foreignKey: "clubId",
        as: "club",
      });
    }
  }

  Team.init(
    {
      division: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Team",
    }
  );

  return Team;
};
