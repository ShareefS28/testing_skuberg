var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _cryptocurrencies = require("./cryptocurrencies");
var _cryptos = require("./cryptos");
var _fiat = require("./fiat");
var _orders = require("./orders");
var _transactions = require("./transactions");
var _users = require("./users");
var _wallets = require("./wallets");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var cryptocurrencies = _cryptocurrencies(sequelize, DataTypes);
  var cryptos = _cryptos(sequelize, DataTypes);
  var fiat = _fiat(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var transactions = _transactions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var wallets = _wallets(sequelize, DataTypes);

  cryptos.belongsTo(cryptocurrencies, { as: "cryptocurrency", foreignKey: "cryptocurrency_id"});
  cryptocurrencies.hasMany(cryptos, { as: "cryptos", foreignKey: "cryptocurrency_id"});

  orders.belongsTo(cryptocurrencies, { as: "cryptocurrency", foreignKey: "cryptocurrency_id"});
  cryptocurrencies.hasMany(orders, { as: "orders", foreignKey: "cryptocurrency_id"});

  fiat.belongsTo(cryptos, { as: "crypto", foreignKey: "crypto_id"});
  cryptos.hasMany(fiat, { as: "fiats", foreignKey: "crypto_id"});
  
  orders.belongsTo(cryptos, { as: "crypto", foreignKey: "crypto_id"});
  cryptos.hasMany(orders, { as: "orders", foreignKey: "crypto_id"});

  transactions.hasOne(cryptos, { as: "from_crypto", foreignKey: "from_crypto_id"});
  cryptos.hasOne(transactions, { as: "transactions", foreignKey: "from_crypto_id"});

  transactions.hasOne(cryptos, { as: "to_crypto", foreignKey: "to_crypto_id"});
  cryptos.hasOne(transactions, { as: "to_crypto_transactions", foreignKey: "to_crypto_id"});

  wallets.belongsTo(cryptos, { as: "crypto_crypto", foreignKey: "crypto_id"});
  cryptos.hasMany(wallets, { as: "crypto_wallets", foreignKey: "crypto_id"});

  transactions.hasOne(orders, { as: "from_order", foreignKey: "from_order_id"});
  orders.hasOne(transactions, { as: "transactions", foreignKey: "from_order_id"});

  transactions.hasOne(orders, { as: "to_order", foreignKey: "to_order_id"});
  orders.hasOne(transactions, { as: "to_order_transactions", foreignKey: "to_order_id"});

  fiat.hasOne(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(fiat, { as: "fiats", foreignKey: "user_id"});

  orders.hasOne(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(orders, { as: "orders", foreignKey: "user_id"});

  transactions.hasOne(users, { as: "from_user", foreignKey: "from_user_id"});
  users.hasOne(transactions, { as: "transactions", foreignKey: "from_user_id"});

  transactions.hasOne(users, { as: "to_user", foreignKey: "to_user_id"});
  users.hasOne(transactions, { as: "to_user_transactions", foreignKey: "to_user_id"});

  wallets.hasOne(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(wallets, { as: "wallets", foreignKey: "user_id"});

  cryptos.belongsTo(wallets, { as: "wallet", foreignKey: "wallet_id"});
  wallets.hasMany(cryptos, { as: "cryptos", foreignKey: "wallet_id"});

  return {
    SequelizeMeta,
    cryptocurrencies,
    cryptos,
    fiat,
    orders,
    transactions,
    users,
    wallets,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
