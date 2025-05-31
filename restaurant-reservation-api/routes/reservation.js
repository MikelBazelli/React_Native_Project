const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const verifyToken = require('../middleware/verifyToken');

// User reservation routes
router.post('/', verifyToken, reservationController.makeReservation);
router.get('/user', verifyToken, reservationController.getUserReservations);
router.put('/:id', verifyToken, reservationController.editReservation);
router.delete('/:id', verifyToken, reservationController.deleteReservation);

// Restaurant management
router.get('/restaurant', verifyToken, reservationController.getAllRestaurants);
router.post('/restaurant', verifyToken, reservationController.createRestaurant);
router.put('/restaurant/:id', verifyToken, reservationController.updateRestaurant);
router.delete('/restaurant/:id', verifyToken, reservationController.deleteRestaurant);
router.get('/admin', reservationController.getAllReservations);


module.exports = router;
