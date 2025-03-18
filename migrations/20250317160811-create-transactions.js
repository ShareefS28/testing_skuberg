'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {

      await queryInterface.sequelize.query(
        `CREATE TABLE IF NOT EXISTS transactions (
          id SERIAL PRIMARY KEY,
          from_order_id INT NOT NULL,
          from_user_id INT NOT NULL,
          from_crypto_id INT NOT NULL,
          to_order_id INT NOT NULL,
          to_user_id INT NOT NULL,
          to_crypto_id INT NOT NULL,
          quantity NUMERIC(20,2) NOT NULL DEFAULT 0,
          CONSTRAINT fk_from_user_id FOREIGN KEY (from_user_id) REFERENCES users(id),
          CONSTRAINT fk_to_user_id FOREIGN KEY (to_user_id) REFERENCES users(id)
        );`,
        { transaction }
      );
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(`DROP TABLE IF EXISTS transactions;`, { transaction });
    });
  }
};
