const { db,
    User, Crypto, Cryptocurrency, Order, Transaction } = require('../models');
const transactionController = require('./transactionController');

// Create
module.exports.createOrder = async function(req, res){
    const transaction = await db.sequelize.transaction();

    try{
        const { id } = req.params;
        const { CryptocurrencyId, CryptoId, Type, Price, Quantity } = req.body;

        const user = await User.findByPk(id)

        const order_buy = await Order.create({
            user_id: user.id,
            crypto_id: CryptoId,
            cryptocurrency_id: CryptocurrencyId,
            type: "BUY",
            price: 10.0,
            quantity: 10,
        }, { transaction })

        await transactionController.createTrans(_order=order_buy, _transaction=transaction);

        const order_sell = await Order.create({
            user_id: user.id,
            crypto_id: CryptoId,
            cryptocurrency_id: CryptocurrencyId,
            type: "SELL",
            price: 10.0,
            quantity: 2,
        }, { transaction })

        await transactionController.createTrans(_order=order_sell, _transaction=transaction);
        
        await transaction.commit();

        res.status(201).json({ user, order_buy, order_sell });
    }
    catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
}