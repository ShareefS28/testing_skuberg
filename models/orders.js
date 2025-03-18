const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Order = sequelize.define('orders', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    crypto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cryptos',
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
    type: {
      type: DataTypes.ENUM("BUY","SELL"),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "orders_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  return Order;
};
