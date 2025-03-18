const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cryptocurrencies', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    abbreviate: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "cryptocurrencies_abbreviate_key"
    }
  }, {
    sequelize,
    tableName: 'cryptocurrencies',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cryptocurrencies_abbreviate_key",
        unique: true,
        fields: [
          { name: "abbreviate" },
        ]
      },
      {
        name: "cryptocurrencies_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
