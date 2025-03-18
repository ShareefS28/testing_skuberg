const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create
router.post('/createOrder/:id', orderController.createOrder);

module.exports = router;