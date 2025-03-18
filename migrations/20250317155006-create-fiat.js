'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(
        `CREATE TYPE fiat_currency AS ENUM ( 
          'THB', 'USD' 
        );`,
        { transaction }
      )

      await queryInterface.sequelize.query(
        `CREATE TABLE IF NOT EXISTS fiat (
          id SERIAL PRIMARY KEY,
          user_id INT NOT NULL,
          crypto_id INT NOT NULL,
          type fiat_currency NOT NULL,
          amount NUMERIC(20,2) NOT NULL DEFAULT 0
        );`,
        { transaction }
      );

      await queryInterface.sequelize.query(
        `ALTER TABLE fiat ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;`,
        { transaction }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(`ALTER TABLE fiat DROP CONSTRAINT fk_user_id;`, { transaction });

      await queryInterface.sequelize.query(`DROP TABLE IF EXISTS fiat;`, { transaction })

      await queryInterface.sequelize.query(`DROP TYPE fiat_currency;`, { transaction });
    });
  }
};
