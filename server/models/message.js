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
    }
  }
  Message.init(
    {
      from_id: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      to_id: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      repo_id: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      org_id:{
        allowNull: false,
        type:DataTypes.STRING
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
