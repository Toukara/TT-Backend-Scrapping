const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      Team.belongsTo(models.Club, { foreignKey: "clubId", as: "club" });
    }
  }
  Team.init(
    {
      division: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Team",
    }
  );

  return Team;
};
