'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(
        `CREATE TYPE trade_status AS ENUM ( 'BUY', 'SELL' );`,
        { transaction }
      );

      await queryInterface.sequelize.query(
        `CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          user_id INT NOT NULL,
          crypto_id INT NOT NULL,
          cryptocurrency_id INT NOT NULL,
          type trade_status NOT NULL,
          price NUMERIC(20,2) NOT NULL DEFAULT 0,
          quantity NUMERIC(20,2) NOT NULL DEFAULT 0,
          CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
          CONSTRAINT fk_cryptocurrency_id FOREIGN KEY (cryptocurrency_id) REFERENCES cryptocurrencies(id)
        );`,
        { transaction }
      );

      await queryInterface.sequelize.query(
        `ALTER TABLE transactions ADD CONSTRAINT fk_from_order_id FOREIGN KEY (from_order_id) REFERENCES orders(id);`,
        { transaction }
      );

      await queryInterface.sequelize.query(
        `ALTER TABLE transactions ADD CONSTRAINT fk_to_order_id FOREIGN KEY (to_order_id) REFERENCES orders(id);`,
        { transaction }
      );

    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(`ALTER TABLE transactions DROP CONSTRAINT fk_from_order_id;`, { transaction });
      await queryInterface.sequelize.query(`ALTER TABLE transactions DROP CONSTRAINT fk_to_order_id;`, { transaction });

      await queryInterface.sequelize.query(`DROP TABLE IF EXISTS orders;`, { transaction });
      
      await queryInterface.sequelize.query(`DROP TYPE trade_status;`, { transaction });
    });
  }
};
