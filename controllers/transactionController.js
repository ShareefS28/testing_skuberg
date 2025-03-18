const { db,
    Crypto, Cryptocurrency, Order, Transaction } = require('../models');

// Create
/**
 * 
 * @param {Order} _order 
 */
module.exports.createTrans = async function(_order, _transaction){
    try{
        const order = await Order.findByPk(_order.id, { transaction: _transaction })

        const transaction = await Transaction.create({
            from_order_id: order.id,
            from_user_id: order.user_id,
            from_crypto_id: order.crypto_id,
            to_order_id: order.id,
            to_user_id: order.user_id,
            to_crypto_id: order.crypto_id,
            quantity: order.quantity
        }, { transaction: _transaction })

        const from_crypto = await Crypto.findByPk(transaction.from_crypto_id, { transaction: _transaction });
        const to_crypto = await Crypto.findByPk(transaction.to_crypto_id, { transaction: _transaction });
        

        switch(order.type){
            case "BUY": 
                    from_crypto.balance -= (order.quantity * order.price);
                    to_crypto.balance += (order.quantity * order.price);
                break;
            case "SELL":
                    from_crypto.balance += (order.quantity * order.price);
                    to_crypto.balance -= (order.quantity * order.price);
                break;
        }

        await from_crypto.save();
        await to_crypto.save();
    }
    catch (error) {
        throw error;
    }
}