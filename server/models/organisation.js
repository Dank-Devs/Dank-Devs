"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Organisation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Organisation.init(
    {
      github_id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      avatar_url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Organisation",
    }
  );
  return Organisation;
};
