const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

router.post('/register', authController.registerRestaurant);
router.post('/login', authController.loginRestaurant);

router.get('/restaurants', authController.getAllRestaurants);
router.delete('/restaurants/:id', authController.deleteRestaurantById); // ✅ Admin delete

router.put('/restaurant', verifyToken, authController.updateRestaurant);
router.delete('/restaurant', verifyToken, authController.deleteRestaurant); // ✅ Self delete

module.exports = router;
