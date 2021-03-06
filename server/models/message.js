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
      Message.belongsTo(models.Chat, {
        foreignKey: "chat_id",
        targetKey: "chat_id",
      });
      Message.belongsTo(models.User, {
        foreignKey: "sender_id",
        targetKey: "github_id",
      });
    }
  }
  Message.init(
    {
      chat_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      sender_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      uuid: {
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        type: DataTypes.UUID,
      },
      status: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
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
