'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cryptocurrencies', [
      {
        name: 'BITCOIN',
        abbreviate: 'BTC',
      },
      {
        name: 'ETHEREUM',
        abbreviate: 'ETH',
      },
      {
        name: 'RIPPLECONSENSUSLEDGER',
        abbreviate: 'XRP',
      },
      {
        name: 'DOGECOIN',
        abbreviate: 'DOGE',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cryptocurrencies', null, {});
  }
};
