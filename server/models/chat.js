"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chat.belongsTo(models.Repository, {
        foreignKey: "repo_id",
        targetKey: "github_id",
      });
      Chat.belongsTo(models.Organisation, {
        foreignKey: "org_id",
        targetKey: "github_id",
      });
    }
  }

  Chat.init(
    {
      chat_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      type: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      repo_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      org_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      uuid: {
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "Chat",
    }
  );
  return Chat;
};
