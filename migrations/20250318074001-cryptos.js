'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(
        `CREATE TABLE IF NOT EXISTS cryptos (
          id SERIAL PRIMARY KEY,
          wallet_id INT NOT NULL,
          cryptocurrency_id INT NOT NULL,
          balance NUMERIC(20,2) NOT NULL DEFAULT 0,
          CONSTRAINT fk_wallet_id FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE,
          CONSTRAINT fk_cryptocurrencies_id FOREIGN KEY (cryptocurrency_id) REFERENCES cryptocurrencies(id)
        );`,
        { transaction }
      );

      await queryInterface.sequelize.query(
        `ALTER TABLE fiat ADD CONSTRAINT fk_crypto_id FOREIGN KEY (crypto_id) REFERENCES cryptos(id);`,
        { transaction }
      );

      await queryInterface.sequelize.query(
        `ALTER TABLE transactions ADD CONSTRAINT fk_from_crypto_id FOREIGN KEY (from_crypto_id) REFERENCES cryptos(id);`,
        { transaction }
      );

      await queryInterface.sequelize.query(
        `ALTER TABLE transactions ADD CONSTRAINT fk_to_crypto_id FOREIGN KEY (to_crypto_id) REFERENCES cryptos(id);`,
        { transaction }
      );

      await queryInterface.sequelize.query(
        `ALTER TABLE orders ADD CONSTRAINT fk_crypto_id FOREIGN KEY (crypto_id) REFERENCES cryptos(id);`,
        { transaction }
      );
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {

      await queryInterface.sequelize.query(`ALTER TABLE fiat DROP CONSTRAINT fk_crypto_id;`, { transaction });

      await queryInterface.sequelize.query(`ALTER TABLE transactions DROP CONSTRAINT fk_from_crypto_id;`, { transaction });

      await queryInterface.sequelize.query(`ALTER TABLE transactions DROP CONSTRAINT fk_to_crypto_id;`, { transaction });
      
      await queryInterface.sequelize.query(`ALTER TABLE orders DROP CONSTRAINT fk_crypto_id;`, { transaction });

      await queryInterface.sequelize.query(
        `DROP TABLE IF EXISTS cryptos;`,
        { transaction }
      );
    });
  }
};
