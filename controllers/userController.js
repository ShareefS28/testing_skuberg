const { db,
        User, Wallet, Crypto, Cryptocurrency  } = require('../models');

// getById
module.exports.getById = async function(req, res) {
    try {
        const { id } = req.params;
        
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const wallet = await Wallet.findOne({
            where: {
              user_id: user.id
        }});

        const crypto = await Crypto.findAll({
            where: {
                wallet_id: wallet.id
        }});

        res.status(200).json({ user, wallet, crypto});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create
module.exports.createUser = async function(req, res){
    const transaction = await db.sequelize.transaction();

    try{
        const { Name, Email, Password } = req.body;
        
        const user = await User.create({
            name: Name,
            email: Email,
            password: Password,
        }, { transaction })

        const wallet = await Wallet.create({
            user_id: user.id,
        }, { transaction })

        const _cryptocurrency = await Cryptocurrency.findAll();

        const crypto = await Promise.all(_cryptocurrency.map(async (item) => {
            return await Crypto.create({
                wallet_id: wallet.id,
                cryptocurrency_id: item.id,
                balance: 99999999999.99
            }, { transaction })
        }));
        
        wallet.crypto_id = await Promise.all(crypto.map(item => item.id));

        await transaction.commit();

        res.status(201).json({ user, wallet, crypto });
    }
    catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
};

// Delete
module.exports.deleteUser = async function(req, res) {
    try {
        const { id } = req.params;
        
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};