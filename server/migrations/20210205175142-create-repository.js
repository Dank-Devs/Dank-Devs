"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Repositories", {
      github_id: {
        primaryKey: true,
        unique: true,
        type: Sequelize.STRING,
      },
      repo_name: {
        type: Sequelize.STRING,
      },
      repo_url: {
        type: Sequelize.STRING,
      },
      org_id: {
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
    await queryInterface.dropTable("Repositories");
  },
};
