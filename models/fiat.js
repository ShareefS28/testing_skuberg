const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fiat', {
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
    type: {
      type: DataTypes.ENUM("THB","USD"),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'fiat',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "fiat_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
