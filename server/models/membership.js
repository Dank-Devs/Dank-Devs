"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Membership.belongsTo(models.Chat, {
        foreignKey: "chat_id",
        targetKey: "chat_id",
      });

      Membership.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "github_id",
      });
    }
  }
  Membership.init(
    {
      chat_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      role: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      uuid: {
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "Membership",
    }
  );
  return Membership;
};
