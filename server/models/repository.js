"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Repository extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Repository.init(
    {
      github_id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.STRING,
      },
      repo_name: {
        type: DataTypes.STRING,
      },
      repo_url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Repository",
    }
  );
  return Repository;
};
