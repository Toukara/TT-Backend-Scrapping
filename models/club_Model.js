const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    static associate(models) {
      Club.hasMany(models.Team, { foreignKey: "clubId", as: "teams" });
    }
  }

  Club.init(
    {
      name: DataTypes.STRING,
      id: { type: DataTypes.INTEGER, primaryKey: true },
      contacts: DataTypes.JSON,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Club",
    }
  );

  return Club;
};
