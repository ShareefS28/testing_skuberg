const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cryptos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    wallet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'wallets',
        key: 'id'
      }
    },
    cryptocurrency_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cryptocurrencies',
        key: 'id'
      }
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'cryptos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cryptos_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
