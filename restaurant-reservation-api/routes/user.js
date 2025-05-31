const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getAllUsers);
router.get('/me', verifyToken, userController.getCurrentUser);
router.delete('/', verifyToken, userController.deleteUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUserById);

module.exports = router;
