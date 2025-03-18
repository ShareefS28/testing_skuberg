const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Transaction = sequelize.define('transactions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    from_order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    from_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    from_crypto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cryptos',
        key: 'id'
      }
    },
    to_order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    to_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    to_crypto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cryptos',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'transactions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "transactions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  return Transaction;
};
