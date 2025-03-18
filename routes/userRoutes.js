const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// getById
router.get('/getById/:id', userController.getById);

// Create
router.post('/createUser', userController.createUser);

// Update
// router.put('/updateUser/:id', userController.updateUser);

// Delete
router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;