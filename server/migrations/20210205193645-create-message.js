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
        type: Sequelize.STRING,
      },
      to_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      repo_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      org_id:{
        allowNull: false,
        type:Sequelize.STRING
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
