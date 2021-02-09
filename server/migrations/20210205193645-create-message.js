"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      from_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      to_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      repo_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      org_id:{
        allowNull: false,
        type:Sequelize.INTEGER
      },
      uuid: {
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        type: Sequelize.UUID,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Messages");
  },
};
