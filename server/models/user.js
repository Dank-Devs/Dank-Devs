"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      github_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      github_login: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "invalid email",
          },
        },
      },
      avatar_url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
