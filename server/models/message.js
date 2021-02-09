"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.User, {
        foreignKey: "from_id",
        targetKey: "github_id",
      });
      Message.belongsTo(models.Repository, {
        foreignKey: "repo_id",
        targetKey: "github_id",
      });
      Message.belongsTo(models.Organisation, {
        foreignKey: "org_id",
        targetKey: "github_id",
      });
    }
  }
  Message.init(
    {
      from_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      to_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
