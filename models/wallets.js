const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Wallet = sequelize.define('wallets', {
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
  }, {
    sequelize,
    tableName: 'wallets',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "wallets_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  return Wallet;
};
