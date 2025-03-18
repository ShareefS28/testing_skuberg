'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(
        `CREATE TABLE IF NOT EXISTS cryptocurrencies (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          abbreviate VARCHAR(255) UNIQUE NOT NULL
        );`,
        { transaction }
      );
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(
        `DROP TABLE IF EXISTS cryptocurrencies;`,
        { transaction }
      );
    });
  }
};
